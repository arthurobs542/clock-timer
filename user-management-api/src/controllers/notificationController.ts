import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { notificationService } from "../services/notificationService";
import { NotificationType, NotificationPriority } from "@prisma/client";

export class NotificationController {

  async createNotification(req: AuthRequest, res: Response) {
    try {
      const notification = await notificationService.createNotification(
        req.body
      );

      res.status(201).json({
        success: true,
        message: "Notificação criada com sucesso",
        data: notification,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }

  async getNotifications(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const options = {
        limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
        offset: req.query.offset ? parseInt(req.query.offset as string) : 0,
        unreadOnly: req.query.unreadOnly === "true",
        type: req.query.type as NotificationType | undefined,
      };

      const result = await notificationService.getNotificationsByUser(
        userId,
        options
      );

      res.json({
        success: true,
        message: "Notificações carregadas com sucesso",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }

  async markAsRead(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;

      const notification = await notificationService.markAsRead(id, userId);

      res.json({
        success: true,
        message: "Notificação marcada como lida",
        data: notification,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }

  async markAllAsRead(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;

      const result = await notificationService.markAllAsRead(userId);

      res.json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }

  async deleteNotification(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;

      const result = await notificationService.deleteNotification(id, userId);

      res.json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }

  async getNotificationStats(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;

      const stats = await notificationService.getNotificationStats(userId);

      res.json({
        success: true,
        message: "Estatísticas carregadas com sucesso",
        data: stats,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }

  async getNotificationSettings(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;

      const settings = await notificationService.getNotificationSettings(
        userId
      );

      res.json({
        success: true,
        message: "Configurações carregadas com sucesso",
        data: settings,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }

  async updateNotificationSettings(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;

      const settings = await notificationService.updateNotificationSettings(
        userId,
        req.body
      );

      res.json({
        success: true,
        message: "Configurações atualizadas com sucesso",
        data: settings,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }

  async createBulkNotification(req: AuthRequest, res: Response) {
    try {
      const result = await notificationService.createBulkNotification(
        req.body.userIds,
        req.body.title,
        req.body.message,
        req.body.type,
        req.body.priority
      );

      res.status(201).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }

  async cleanupOldNotifications(req: AuthRequest, res: Response) {
    try {
      const daysOld = req.query.daysOld
        ? parseInt(req.query.daysOld as string)
        : 30;

      const result = await notificationService.cleanupOldNotifications(daysOld);

      res.json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }

  async createClockReminder(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { message } = req.body;

      const notification =
        await notificationService.createClockReminderNotification(
          userId,
          message
        );

      res.status(201).json({
        success: true,
        message: "Lembrete de ponto criado com sucesso",
        data: notification,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }

  async createReportNotification(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { reportType } = req.body;

      const notification =
        await notificationService.createReportGeneratedNotification(
          userId,
          reportType
        );

      res.status(201).json({
        success: true,
        message: "Notificação de relatório criada com sucesso",
        data: notification,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }

  async createSecurityAlert(req: AuthRequest, res: Response) {
    try {
      const { userIds, alertDetails } = req.body;

      if (userIds && Array.isArray(userIds)) {

        const result = await notificationService.createBulkNotification(
          userIds,
          "Alerta de Segurança",
          alertDetails,
          NotificationType.SECURITY_ALERT,
          NotificationPriority.HIGH
        );

        res.status(201).json({
          success: true,
          message: result.message,
        });
      } else {

        res.status(400).json({
          success: false,
          message: "userIds deve ser um array de IDs de usuários",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }

  async createSystemUpdateNotification(req: AuthRequest, res: Response) {
    try {
      const { userIds, updateDetails } = req.body;

      if (userIds && Array.isArray(userIds)) {
        const result = await notificationService.createBulkNotification(
          userIds,
          "Atualização do Sistema",
          updateDetails,
          NotificationType.SYSTEM_UPDATE,
          NotificationPriority.MEDIUM
        );

        res.status(201).json({
          success: true,
          message: result.message,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "userIds deve ser um array de IDs de usuários",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Erro interno do servidor",
      });
    }
  }
}

export const notificationController = new NotificationController();
