import { Request, Response } from "express";
import { ClockService } from "../services/clockService";
import { AuthRequest } from "../middleware/auth";
import {
  ClockInInput,
  ClockOutInput,
  BreakInput,
  GetClockRecordsInput,
} from "../schemas/clockSchemas";

export class ClockController {
  private clockService: ClockService;

  constructor() {
    this.clockService = new ClockService();
  }

  public async clockIn(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId = req.user!.id;
      const clockData: ClockInInput = req.body;

      const clockRecord = await this.clockService.clockIn(
        userId,
        clockData.notes
      );

      return res.status(201).json({
        message: "Ponto de entrada registrado com sucesso",
        record: clockRecord,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao registrar ponto de entrada",
      });
    }
  }

  public async clockOut(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId = req.user!.id;
      const clockData: ClockOutInput = req.body;

      const clockRecord = await this.clockService.clockOut(
        userId,
        clockData.notes
      );

      return res.status(200).json({
        message: "Ponto de saída registrado com sucesso",
        record: clockRecord,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao registrar ponto de saída",
      });
    }
  }

  public async startBreak(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId = req.user!.id;
      const breakData: BreakInput = req.body;

      const clockRecord = await this.clockService.startBreak(
        userId,
        breakData.notes
      );

      return res.status(200).json({
        message: "Pausa iniciada com sucesso",
        record: clockRecord,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao iniciar pausa",
      });
    }
  }

  public async endBreak(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId = req.user!.id;
      const breakData: BreakInput = req.body;

      const clockRecord = await this.clockService.endBreak(
        userId,
        breakData.notes
      );

      return res.status(200).json({
        message: "Pausa finalizada com sucesso",
        record: clockRecord,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao finalizar pausa",
      });
    }
  }

  public async getCurrentStatus(
    req: AuthRequest,
    res: Response
  ): Promise<Response> {
    try {
      const userId = req.user!.id;
      const status = await this.clockService.getCurrentStatus(userId);

      return res.status(200).json({
        message: "Status atual obtido com sucesso",
        status,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Erro ao obter status atual",
      });
    }
  }

  public async getClockRecords(
    req: AuthRequest,
    res: Response
  ): Promise<Response> {
    try {
      const userId = req.user!.id;
      const query: GetClockRecordsInput = req.query;

      // Se for admin, pode buscar registros de qualquer usuário
      const targetUserId =
        req.user!.role === "ADMIN" && query.userId ? query.userId : userId;

      const startDate = query.startDate ? new Date(query.startDate) : undefined;
      const endDate = query.endDate ? new Date(query.endDate) : undefined;

      const result = await this.clockService.getClockRecords(
        targetUserId,
        startDate,
        endDate,
        query.page || 1,
        query.limit || 10
      );

      return res.status(200).json({
        message: "Registros de ponto encontrados",
        ...result,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Erro ao buscar registros de ponto",
      });
    }
  }

  public async getClockStats(
    req: AuthRequest,
    res: Response
  ): Promise<Response> {
    try {
      const userId = req.user!.id;
      const { startDate, endDate } = req.query;

      const start = startDate ? new Date(startDate as string) : undefined;
      const end = endDate ? new Date(endDate as string) : undefined;

      const stats = await this.clockService.getClockStats(userId, start, end);

      return res.status(200).json({
        message: "Estatísticas obtidas com sucesso",
        stats,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Erro ao obter estatísticas",
      });
    }
  }

  // Endpoints para administradores
  public async getAllClockRecords(
    req: AuthRequest,
    res: Response
  ): Promise<Response> {
    try {
      // Verificar se é admin
      if (req.user!.role !== "ADMIN") {
        return res.status(403).json({
          message: "Apenas administradores podem acessar todos os registros",
        });
      }

      const query: GetClockRecordsInput = req.query;

      const startDate = query.startDate ? new Date(query.startDate) : undefined;
      const endDate = query.endDate ? new Date(query.endDate) : undefined;

      const result = await this.clockService.getClockRecords(
        query.userId,
        startDate,
        endDate,
        query.page || 1,
        query.limit || 10
      );

      return res.status(200).json({
        message: "Todos os registros de ponto encontrados",
        ...result,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Erro ao buscar registros de ponto",
      });
    }
  }
}
