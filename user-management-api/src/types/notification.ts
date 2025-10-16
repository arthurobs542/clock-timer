export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  isRead: boolean;
  createdAt: Date;
  readAt?: Date;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export enum NotificationType {
  CLOCK_REMINDER = "CLOCK_REMINDER",
  CLOCK_IN = "CLOCK_IN",
  CLOCK_OUT = "CLOCK_OUT",
  BREAK_START = "BREAK_START",
  BREAK_END = "BREAK_END",
  REPORT_GENERATED = "REPORT_GENERATED",
  SYSTEM_UPDATE = "SYSTEM_UPDATE",
  SECURITY_ALERT = "SECURITY_ALERT",
  SCHEDULE_CHANGE = "SCHEDULE_CHANGE",
  PASSWORD_EXPIRY = "PASSWORD_EXPIRY",
  GENERAL = "GENERAL",
}

export enum NotificationPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

export interface CreateNotificationRequest {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  priority?: NotificationPriority;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  clockReminder: boolean;
  reportGenerated: boolean;
  systemUpdates: boolean;
  securityAlerts: boolean;
  scheduleChanges: boolean;
  passwordExpiry: boolean;
}

export interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<NotificationType, number>;
  byPriority: Record<NotificationPriority, number>;
}
