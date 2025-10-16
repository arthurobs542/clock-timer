import {
  PrismaClient,
  NotificationType,
  NotificationPriority,
} from "@prisma/client";
import { db } from "../config/database";
import {
  CreateNotificationRequest,
  NotificationSettings,
  NotificationStats,
} from "../types/notification";

export class NotificationService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = db;
  }

  async createNotification(data: CreateNotificationRequest) {
    try {
      const notification = await this.prisma.notification.create({
        data: {
          userId: data.userId,
          title: data.title,
          message: data.message,
          type: data.type,
          priority: data.priority || NotificationPriority.MEDIUM,
          actionUrl: data.actionUrl,
          metadata: data.metadata || {},
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              notificationSettings: true,
            },
          },
        },
      });

      await this.sendRealTimeNotification(notification);

      return notification;
    } catch (error) {
      console.error("Erro ao criar notificação:", error);
      throw new Error("Falha ao criar notificação");
    }
  }

  async getNotificationsByUser(
    userId: string,
    options: {
      limit?: number;
      offset?: number;
      unreadOnly?: boolean;
      type?: NotificationType;
    } = {}
  ) {
    try {
      const { limit = 20, offset = 0, unreadOnly = false, type } = options;

      const where: any = { userId };

      if (unreadOnly) {
        where.isRead = false;
      }

      if (type) {
        where.type = type;
      }

      const [notifications, total] = await Promise.all([
        this.prisma.notification.findMany({
          where,
          orderBy: { createdAt: "desc" },
          take: limit,
          skip: offset,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        }),
        this.prisma.notification.count({ where }),
      ]);

      return {
        notifications,
        total,
        hasMore: offset + limit < total,
      };
    } catch (error) {
      console.error("Erro ao buscar notificações:", error);
      throw new Error("Falha ao buscar notificações");
    }
  }

  async markAsRead(notificationId: string, userId: string) {
    try {
      const notification = await this.prisma.notification.update({
        where: {
          id: notificationId,
          userId: userId,
        },
        data: {
          isRead: true,
          readAt: new Date(),
        },
      });

      return notification;
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error);
      throw new Error("Falha ao marcar notificação como lida");
    }
  }

  async markAllAsRead(userId: string) {
    try {
      await this.prisma.notification.updateMany({
        where: {
          userId: userId,
          isRead: false,
        },
        data: {
          isRead: true,
          readAt: new Date(),
        },
      });

      return { message: "Todas as notificações foram marcadas como lidas" };
    } catch (error) {
      console.error("Erro ao marcar todas as notificações como lidas:", error);
      throw new Error("Falha ao marcar notificações como lidas");
    }
  }

  async deleteNotification(notificationId: string, userId: string) {
    try {
      await this.prisma.notification.delete({
        where: {
          id: notificationId,
          userId: userId,
        },
      });

      return { message: "Notificação deletada com sucesso" };
    } catch (error) {
      console.error("Erro ao deletar notificação:", error);
      throw new Error("Falha ao deletar notificação");
    }
  }

  async getNotificationStats(userId: string): Promise<NotificationStats> {
    try {
      const [total, unread, byType, byPriority] = await Promise.all([
        this.prisma.notification.count({ where: { userId } }),
        this.prisma.notification.count({ where: { userId, isRead: false } }),
        this.prisma.notification.groupBy({
          by: ["type"],
          where: { userId },
          _count: { type: true },
        }),
        this.prisma.notification.groupBy({
          by: ["priority"],
          where: { userId },
          _count: { priority: true },
        }),
      ]);

      const typeStats: Record<string, number> = {};
      byType.forEach((item) => {
        typeStats[item.type] = item._count.type;
      });

      const priorityStats: Record<string, number> = {};
      byPriority.forEach((item) => {
        priorityStats[item.priority] = item._count.priority;
      });

      return {
        total,
        unread,
        byType: typeStats as any,
        byPriority: priorityStats as any,
      };
    } catch (error) {
      console.error("Erro ao buscar estatísticas de notificações:", error);
      throw new Error("Falha ao buscar estatísticas de notificações");
    }
  }

  async getNotificationSettings(userId: string) {
    try {
      let settings = await this.prisma.notificationSettings.findUnique({
        where: { userId },
      });

      if (!settings) {

        settings = await this.prisma.notificationSettings.create({
          data: {
            userId,
            email: true,
            push: true,
            clockReminder: true,
            reportGenerated: false,
            systemUpdates: true,
            securityAlerts: true,
            scheduleChanges: true,
            passwordExpiry: true,
          },
        });
      }

      return settings;
    } catch (error) {
      console.error("Erro ao buscar configurações de notificação:", error);
      throw new Error("Falha ao buscar configurações de notificação");
    }
  }

  async updateNotificationSettings(
    userId: string,
    settings: Partial<NotificationSettings>
  ) {
    try {
      const updatedSettings = await this.prisma.notificationSettings.upsert({
        where: { userId },
        update: {
          email: settings.email,
          push: settings.push,
          clockReminder: settings.clockReminder,
          reportGenerated: settings.reportGenerated,
          systemUpdates: settings.systemUpdates,
          securityAlerts: settings.securityAlerts,
          scheduleChanges: settings.scheduleChanges,
          passwordExpiry: settings.passwordExpiry,
          updatedAt: new Date(),
        },
        create: {
          userId,
          email: settings.email ?? true,
          push: settings.push ?? true,
          clockReminder: settings.clockReminder ?? true,
          reportGenerated: settings.reportGenerated ?? false,
          systemUpdates: settings.systemUpdates ?? true,
          securityAlerts: settings.securityAlerts ?? true,
          scheduleChanges: settings.scheduleChanges ?? true,
          passwordExpiry: settings.passwordExpiry ?? true,
        },
      });

      return updatedSettings;
    } catch (error) {
      console.error("Erro ao atualizar configurações de notificação:", error);
      throw new Error("Falha ao atualizar configurações de notificação");
    }
  }

  async createClockReminderNotification(userId: string, message?: string) {
    return this.createNotification({
      userId,
      title: "Lembrete de Ponto",
      message: message || "Não esqueça de bater o ponto!",
      type: NotificationType.CLOCK_REMINDER,
      priority: NotificationPriority.MEDIUM,
    });
  }

  async createClockInNotification(userId: string, clockInTime: Date) {
    return this.createNotification({
      userId,
      title: "Ponto Registrado",
      message: `Entrada registrada às ${clockInTime.toLocaleTimeString()}`,
      type: NotificationType.CLOCK_IN,
      priority: NotificationPriority.LOW,
      actionUrl: "/clock",
    });
  }

  async createClockOutNotification(
    userId: string,
    clockOutTime: Date,
    totalHours: number
  ) {
    return this.createNotification({
      userId,
      title: "Saída Registrada",
      message: `Saída registrada às ${clockOutTime.toLocaleTimeString()}. Total: ${totalHours.toFixed(
        1
      )}h`,
      type: NotificationType.CLOCK_OUT,
      priority: NotificationPriority.LOW,
      actionUrl: "/clock",
    });
  }

  async createReportGeneratedNotification(userId: string, reportType: string) {
    return this.createNotification({
      userId,
      title: "Relatório Gerado",
      message: `Seu relatório de ${reportType} foi gerado com sucesso`,
      type: NotificationType.REPORT_GENERATED,
      priority: NotificationPriority.MEDIUM,
      actionUrl: "/reports",
    });
  }

  async createSystemUpdateNotification(userId: string, updateDetails: string) {
    return this.createNotification({
      userId,
      title: "Atualização do Sistema",
      message: updateDetails,
      type: NotificationType.SYSTEM_UPDATE,
      priority: NotificationPriority.MEDIUM,
    });
  }

  async createSecurityAlertNotification(userId: string, alertDetails: string) {
    return this.createNotification({
      userId,
      title: "Alerta de Segurança",
      message: alertDetails,
      type: NotificationType.SECURITY_ALERT,
      priority: NotificationPriority.HIGH,
    });
  }

  async createBulkNotification(
    userIds: string[],
    title: string,
    message: string,
    type: NotificationType,
    priority: NotificationPriority = NotificationPriority.MEDIUM
  ) {
    try {
      const notifications = userIds.map((userId) => ({
        userId,
        title,
        message,
        type,
        priority,
        createdAt: new Date(),
      }));

      await this.prisma.notification.createMany({
        data: notifications,
      });

      return {
        message: `${notifications.length} notificações criadas com sucesso`,
      };
    } catch (error) {
      console.error("Erro ao criar notificações em lote:", error);
      throw new Error("Falha ao criar notificações em lote");
    }
  }

  private async sendRealTimeNotification(notification: any) {

    console.log(
      `Enviando notificação em tempo real para usuário ${notification.userId}:`,
      notification.title
    );

  }

  async cleanupOldNotifications(daysOld: number = 30) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysOld);

      const deletedCount = await this.prisma.notification.deleteMany({
        where: {
          createdAt: {
            lt: cutoffDate,
          },
          isRead: true,
        },
      });

      return {
        message: `${deletedCount.count} notificações antigas foram removidas`,
      };
    } catch (error) {
      console.error("Erro ao limpar notificações antigas:", error);
      throw new Error("Falha ao limpar notificações antigas");
    }
  }
}

export const notificationService = new NotificationService();
