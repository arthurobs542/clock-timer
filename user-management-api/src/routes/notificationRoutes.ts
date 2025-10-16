import { Router } from "express";
import { notificationController } from "../controllers/notificationController";
import { authenticate } from "../middleware/auth";
import { authorize } from "../middleware/auth";
import { validateBody, validateQuery } from "../middleware/validation";
import {
  createNotificationSchema,
  updateNotificationSchema,
  notificationSettingsSchema,
  getNotificationsSchema,
  bulkNotificationSchema,
  cleanupNotificationsSchema,
} from "../schemas/notificationSchemas";

const router = Router();

router.use(authenticate);

router.get(
  "/",
  validateQuery(getNotificationsSchema),
  notificationController.getNotifications
);

router.get("/stats", notificationController.getNotificationStats);

router.get("/settings", notificationController.getNotificationSettings);

router.put(
  "/settings",
  validateBody(notificationSettingsSchema),
  notificationController.updateNotificationSettings
);

router.put("/:id/read", notificationController.markAsRead);

router.put("/read-all", notificationController.markAllAsRead);

router.delete("/:id", notificationController.deleteNotification);

router.post("/clock-reminder", notificationController.createClockReminder);

router.post(
  "/report-generated",
  notificationController.createReportNotification
);

router.use(authorize(["ADMIN", "MANAGER"]));

router.post(
  "/",
  validateBody(createNotificationSchema),
  notificationController.createNotification
);

router.post(
  "/bulk",
  validateBody(bulkNotificationSchema),
  notificationController.createBulkNotification
);

router.post("/security-alert", notificationController.createSecurityAlert);

router.post(
  "/system-update",
  notificationController.createSystemUpdateNotification
);

router.delete(
  "/cleanup",
  validateQuery(cleanupNotificationsSchema),
  notificationController.cleanupOldNotifications
);

export default router;
