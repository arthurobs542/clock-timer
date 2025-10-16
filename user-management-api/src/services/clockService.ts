import prisma from "../config/database";
import { ClockRecord, ClockStats } from "../types";
import { notificationService } from "./notificationService";

export class ClockService {
  async clockIn(userId: string, notes?: string): Promise<ClockRecord> {
    // Verificar se já existe um registro ativo para hoje
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingRecord = await prisma.clockRecord.findFirst({
      where: {
        userId,
        date: {
          gte: today,
        },
        status: "ACTIVE",
        clockIn: {
          not: null,
        },
      },
    });

    if (existingRecord) {
      throw new Error("Você já fez ponto de entrada hoje");
    }

    const clockInTime = new Date();
    const clockRecord = await prisma.clockRecord.create({
      data: {
        userId,
        clockIn: clockInTime,
        notes,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            employeeId: true,
          },
        },
      },
    });

    // Criar notificação de entrada
    try {
      await notificationService.createClockInNotification(userId, clockInTime);
    } catch (error) {
      console.error("Erro ao criar notificação de entrada:", error);
    }

    return clockRecord;
  }

  async clockOut(userId: string, notes?: string): Promise<ClockRecord> {
    // Buscar registro ativo de hoje
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingRecord = await prisma.clockRecord.findFirst({
      where: {
        userId,
        date: {
          gte: today,
        },
        status: "ACTIVE",
        clockIn: {
          not: null,
        },
        clockOut: null,
      },
    });

    if (!existingRecord) {
      throw new Error("Nenhum registro de entrada encontrado para hoje");
    }

    const clockOutTime = new Date();

    // Calcular total de horas
    const totalHours = this.calculateTotalHours(
      existingRecord.clockIn!,
      clockOutTime,
      existingRecord.breakStart,
      existingRecord.breakEnd
    );

    const updatedRecord = await prisma.clockRecord.update({
      where: { id: existingRecord.id },
      data: {
        clockOut: clockOutTime,
        totalHours,
        status: "COMPLETED",
        notes: notes || existingRecord.notes,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            employeeId: true,
          },
        },
      },
    });

    // Criar notificação de saída
    try {
      await notificationService.createClockOutNotification(
        userId,
        clockOutTime,
        totalHours
      );
    } catch (error) {
      console.error("Erro ao criar notificação de saída:", error);
    }

    return updatedRecord;
  }

  async startBreak(userId: string, notes?: string): Promise<ClockRecord> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingRecord = await prisma.clockRecord.findFirst({
      where: {
        userId,
        date: {
          gte: today,
        },
        status: "ACTIVE",
        clockIn: {
          not: null,
        },
        clockOut: null,
      },
    });

    if (!existingRecord) {
      throw new Error("Nenhum registro ativo encontrado");
    }

    if (existingRecord.breakStart && !existingRecord.breakEnd) {
      throw new Error("Você já está em pausa");
    }

    const updatedRecord = await prisma.clockRecord.update({
      where: { id: existingRecord.id },
      data: {
        breakStart: new Date(),
        notes: notes || existingRecord.notes,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            employeeId: true,
          },
        },
      },
    });

    return updatedRecord;
  }

  async endBreak(userId: string, notes?: string): Promise<ClockRecord> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingRecord = await prisma.clockRecord.findFirst({
      where: {
        userId,
        date: {
          gte: today,
        },
        status: "ACTIVE",
        clockIn: {
          not: null,
        },
        clockOut: null,
        breakStart: {
          not: null,
        },
        breakEnd: null,
      },
    });

    if (!existingRecord) {
      throw new Error("Nenhuma pausa ativa encontrada");
    }

    const breakEndTime = new Date();

    // Recalcular total de horas se já tiver saída
    let totalHours = existingRecord.totalHours;
    if (existingRecord.clockOut) {
      totalHours = this.calculateTotalHours(
        existingRecord.clockIn!,
        existingRecord.clockOut,
        existingRecord.breakStart!,
        breakEndTime
      );
    }

    const updatedRecord = await prisma.clockRecord.update({
      where: { id: existingRecord.id },
      data: {
        breakEnd: breakEndTime,
        totalHours,
        notes: notes || existingRecord.notes,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            employeeId: true,
          },
        },
      },
    });

    return updatedRecord;
  }

  async getClockRecords(
    userId?: string,
    startDate?: Date,
    endDate?: Date,
    page: number = 1,
    limit: number = 10
  ): Promise<{
    records: ClockRecord[];
    total: number;
    pages: number;
  }> {
    const skip = (page - 1) * limit;

    const where: any = {};

    if (userId) {
      where.userId = userId;
    }

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = startDate;
      if (endDate) where.date.lte = endDate;
    }

    const [records, total] = await Promise.all([
      prisma.clockRecord.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              employeeId: true,
            },
          },
        },
        orderBy: { date: "desc" },
      }),
      prisma.clockRecord.count({ where }),
    ]);

    return {
      records,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  async getClockStats(
    userId: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<ClockStats> {
    const where: any = { userId, status: "COMPLETED" };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = startDate;
      if (endDate) where.date.lte = endDate;
    }

    const records = await prisma.clockRecord.findMany({
      where,
      select: {
        totalHours: true,
        date: true,
      },
    });

    const totalHours = records.reduce(
      (sum, record) => sum + (record.totalHours || 0),
      0
    );
    const totalDays = records.length;
    const averageHoursPerDay = totalDays > 0 ? totalHours / totalDays : 0;

    // Calcular horas da semana atual
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const currentWeekRecords = records.filter(
      (record) => record.date >= weekStart
    );
    const currentWeekHours = currentWeekRecords.reduce(
      (sum, record) => sum + (record.totalHours || 0),
      0
    );

    // Calcular horas do mês atual
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const currentMonthRecords = records.filter(
      (record) => record.date >= monthStart
    );
    const currentMonthHours = currentMonthRecords.reduce(
      (sum, record) => sum + (record.totalHours || 0),
      0
    );

    return {
      totalHours,
      totalDays,
      averageHoursPerDay,
      currentWeekHours,
      currentMonthHours,
    };
  }

  async getCurrentStatus(userId: string): Promise<{
    isClockedIn: boolean;
    isOnBreak: boolean;
    currentRecord?: ClockRecord;
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const currentRecord = await prisma.clockRecord.findFirst({
      where: {
        userId,
        date: {
          gte: today,
        },
        status: "ACTIVE",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            employeeId: true,
          },
        },
      },
    });

    if (!currentRecord) {
      return {
        isClockedIn: false,
        isOnBreak: false,
      };
    }

    const isClockedIn = !!currentRecord.clockIn && !currentRecord.clockOut;
    const isOnBreak = !!currentRecord.breakStart && !currentRecord.breakEnd;

    return {
      isClockedIn,
      isOnBreak,
      currentRecord,
    };
  }

  private calculateTotalHours(
    clockIn: Date,
    clockOut: Date,
    breakStart?: Date | null,
    breakEnd?: Date | null
  ): number {
    const totalMinutes = (clockOut.getTime() - clockIn.getTime()) / (1000 * 60);

    let breakMinutes = 0;
    if (breakStart && breakEnd) {
      breakMinutes = (breakEnd.getTime() - breakStart.getTime()) / (1000 * 60);
    }

    const workingMinutes = totalMinutes - breakMinutes;
    return workingMinutes / 60; // Converter para horas
  }
}
