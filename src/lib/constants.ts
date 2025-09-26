// Constantes do sistema

export const APP_CONFIG = {
  name: "Clock Timer",
  description: "Sistema de controle de ponto para micro empresas",
  version: "1.0.0",
  author: "Arthur Robson",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  EMPLOYEE_DASHBOARD: "/employee",
  ADMIN_DASHBOARD: "/admin",
  SCHEDULES: "/admin/schedules",
  REPORTS: "/admin/reports",
  EMPLOYEES: "/admin/employees",
  PROFILE: "/profile",
  SETTINGS: "/settings",
} as const;

export const USER_ROLES = {
  EMPLOYEE: "employee",
  ADMIN: "admin",
} as const;

export const CLOCK_TYPES = {
  CLOCK_IN: "clock_in",
  CLOCK_OUT: "clock_out",
} as const;

export const SESSION_STATUS = {
  ACTIVE: "active",
  COMPLETED: "completed",
  INCOMPLETE: "incomplete",
} as const;

export const NOTIFICATION_TYPES = {
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
  SUCCESS: "success",
} as const;

export const WORK_DAYS = [
  { value: 0, label: "Domingo", short: "Dom" },
  { value: 1, label: "Segunda-feira", short: "Seg" },
  { value: 2, label: "Terça-feira", short: "Ter" },
  { value: 3, label: "Quarta-feira", short: "Qua" },
  { value: 4, label: "Quinta-feira", short: "Qui" },
  { value: 5, label: "Sexta-feira", short: "Sex" },
  { value: 6, label: "Sábado", short: "Sáb" },
] as const;

export const TIME_FORMATS = {
  DISPLAY: "HH:mm",
  INPUT: "HH:mm",
  FULL: "dd/MM/yyyy HH:mm",
  DATE_ONLY: "dd/MM/yyyy",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

export const BREAK_DURATION_OPTIONS = [
  { value: 15, label: "15 minutos" },
  { value: 30, label: "30 minutos" },
  { value: 45, label: "45 minutos" },
  { value: 60, label: "1 hora" },
  { value: 90, label: "1h 30min" },
  { value: 120, label: "2 horas" },
] as const;

export const EXPORT_FORMATS = {
  PDF: "pdf",
  EXCEL: "excel",
  CSV: "csv",
} as const;

export const REPORT_GROUP_BY = {
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
} as const;

// Cores do sistema (baseadas no tema neutral do shadcn)
export const COLORS = {
  primary: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a",
  },
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
} as const;

// Mensagens do sistema
export const MESSAGES = {
  CLOCK_IN_SUCCESS: "Ponto registrado com sucesso!",
  CLOCK_OUT_SUCCESS: "Saída registrada com sucesso!",
  CLOCK_IN_ERROR: "Erro ao registrar entrada. Tente novamente.",
  CLOCK_OUT_ERROR: "Erro ao registrar saída. Tente novamente.",
  INVALID_SESSION: "Sessão inválida. Faça login novamente.",
  UNAUTHORIZED: "Você não tem permissão para acessar esta página.",
  SCHEDULE_CREATED: "Escala criada com sucesso!",
  SCHEDULE_UPDATED: "Escala atualizada com sucesso!",
  SCHEDULE_DELETED: "Escala removida com sucesso!",
  EMPLOYEE_ASSIGNED: "Funcionário atribuído à escala com sucesso!",
  REPORT_GENERATED: "Relatório gerado com sucesso!",
} as const;

// Validações
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 255,
  MAX_DESCRIPTION_LENGTH: 500,
  MIN_BREAK_DURATION: 15,
  MAX_BREAK_DURATION: 240,
  MIN_WORK_HOURS: 1,
  MAX_WORK_HOURS: 12,
} as const;
