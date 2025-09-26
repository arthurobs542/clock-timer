// Tipos principais do sistema de clock in/out

export interface User {
  id: string;
  name: string;
  email: string;
  role: "employee" | "admin";
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkSchedule {
  id: string;
  name: string;
  description?: string;
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  breakDuration: number; // em minutos
  workingDays: number[]; // 0-6 (domingo a sábado)
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeeSchedule {
  id: string;
  employeeId: string;
  scheduleId: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClockRecord {
  id: string;
  employeeId: string;
  type: "clock_in" | "clock_out";
  timestamp: Date;
  location?: {
    latitude: number;
    longitude: number;
  };
  notes?: string;
  createdAt: Date;
}

export interface WorkSession {
  id: string;
  employeeId: string;
  clockInId: string;
  clockOutId?: string;
  startTime: Date;
  endTime?: Date;
  totalMinutes?: number;
  breakMinutes: number;
  status: "active" | "completed" | "incomplete";
  createdAt: Date;
  updatedAt: Date;
}

export interface DailyReport {
  date: string; // YYYY-MM-DD format
  employeeId: string;
  totalWorkMinutes: number;
  totalBreakMinutes: number;
  sessions: WorkSession[];
  clockRecords: ClockRecord[];
  isComplete: boolean;
}

export interface MonthlyReport {
  month: string; // YYYY-MM format
  employeeId: string;
  totalWorkDays: number;
  totalWorkMinutes: number;
  totalBreakMinutes: number;
  averageDailyHours: number;
  dailyReports: DailyReport[];
}

export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  totalWorkHoursToday: number;
  pendingApprovals: number;
  recentActivity: ClockRecord[];
}

export interface EmployeeDashboardData {
  currentSession?: WorkSession;
  todayStats: {
    totalMinutes: number;
    breakMinutes: number;
    isClockedIn: boolean;
  };
  recentSessions: WorkSession[];
  monthlyStats: {
    totalDays: number;
    totalHours: number;
    averageHours: number;
  };
}

export interface AdminDashboardData {
  stats: DashboardStats;
  recentClockRecords: ClockRecord[];
  activeSchedules: WorkSchedule[];
  pendingApprovals: any[]; // Para futuras funcionalidades
}

// Tipos para formulários
export interface CreateScheduleForm {
  name: string;
  description?: string;
  startTime: string;
  endTime: string;
  breakDuration: number;
  workingDays: number[];
}

export interface EditScheduleForm extends CreateScheduleForm {
  id: string;
  isActive: boolean;
}

export interface AssignScheduleForm {
  employeeId: string;
  scheduleId: string;
  startDate: string;
  endDate?: string;
}

// Tipos para filtros e paginação
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface DateRangeFilter {
  startDate: string;
  endDate: string;
}

export interface EmployeeFilter {
  search?: string;
  role?: "employee" | "admin";
  isActive?: boolean;
}

export interface ClockRecordFilter extends DateRangeFilter {
  employeeId?: string;
  type?: "clock_in" | "clock_out";
}

// Tipos para relatórios
export interface ReportFilters {
  employeeId?: string;
  dateRange: DateRangeFilter;
  includeIncomplete?: boolean;
}

export interface ExportOptions {
  format: "pdf" | "excel" | "csv";
  includeDetails: boolean;
  groupBy: "day" | "week" | "month";
}

// Tipos para notificações
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  isRead: boolean;
  createdAt: Date;
}

// Tipos para configurações
export interface AppSettings {
  companyName: string;
  timezone: string;
  workWeekStart: number; // 0-6 (domingo a sábado)
  requireLocation: boolean;
  allowOvertime: boolean;
  maxBreakMinutes: number;
  autoClockOut: boolean;
  autoClockOutMinutes: number;
}
