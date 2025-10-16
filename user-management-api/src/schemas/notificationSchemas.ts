import { z } from "zod";
import { NotificationType, NotificationPriority } from "@prisma/client";

export const createNotificationSchema = z.object({
  userId: z.string().uuid("ID do usuário deve ser um UUID válido"),
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(100, "Título deve ter no máximo 100 caracteres"),
  message: z
    .string()
    .min(1, "Mensagem é obrigatória")
    .max(500, "Mensagem deve ter no máximo 500 caracteres"),
  type: z.nativeEnum(NotificationType, {
    errorMap: () => ({ message: "Tipo de notificação inválido" }),
  }),
  priority: z
    .nativeEnum(NotificationPriority)
    .optional()
    .default(NotificationPriority.MEDIUM),
  actionUrl: z.string().url("URL de ação deve ser válida").optional(),
  metadata: z.record(z.any()).optional(),
});

export const updateNotificationSchema = z.object({
  isRead: z.boolean().optional(),
});

export const notificationSettingsSchema = z.object({
  email: z.boolean(),
  push: z.boolean(),
  clockReminder: z.boolean(),
  reportGenerated: z.boolean(),
  systemUpdates: z.boolean(),
  securityAlerts: z.boolean(),
  scheduleChanges: z.boolean(),
  passwordExpiry: z.boolean(),
});

export const getNotificationsSchema = z.object({
  limit: z
    .string()
    .transform(Number)
    .refine((n) => n > 0 && n <= 100, {
      message: "Limit deve ser entre 1 e 100",
    })
    .optional()
    .default("20"),
  offset: z
    .string()
    .transform(Number)
    .refine((n) => n >= 0, {
      message: "Offset deve ser maior ou igual a 0",
    })
    .optional()
    .default("0"),
  unreadOnly: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  type: z.nativeEnum(NotificationType).optional(),
});

export const bulkNotificationSchema = z.object({
  userIds: z
    .array(z.string().uuid())
    .min(1, "Pelo menos um usuário deve ser especificado"),
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .max(100, "Título deve ter no máximo 100 caracteres"),
  message: z
    .string()
    .min(1, "Mensagem é obrigatória")
    .max(500, "Mensagem deve ter no máximo 500 caracteres"),
  type: z.nativeEnum(NotificationType),
  priority: z
    .nativeEnum(NotificationPriority)
    .optional()
    .default(NotificationPriority.MEDIUM),
});

export const cleanupNotificationsSchema = z.object({
  daysOld: z
    .string()
    .transform(Number)
    .refine((n) => n > 0 && n <= 365, {
      message: "Dias deve ser entre 1 e 365",
    })
    .optional()
    .default("30"),
});

export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
export type UpdateNotificationInput = z.infer<typeof updateNotificationSchema>;
export type NotificationSettingsInput = z.infer<
  typeof notificationSettingsSchema
>;
export type GetNotificationsQuery = z.infer<typeof getNotificationsSchema>;
export type BulkNotificationInput = z.infer<typeof bulkNotificationSchema>;
export type CleanupNotificationsQuery = z.infer<
  typeof cleanupNotificationsSchema
>;
