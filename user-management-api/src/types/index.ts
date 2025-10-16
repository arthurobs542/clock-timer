import { Role, ClockStatus } from "@prisma/client";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  password: string;
  avatar?: string;
  role: Role;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClockRecord {
  id: string;
  userId: string;
  clockIn?: Date;
  clockOut?: Date;
  breakStart?: Date;
  breakEnd?: Date;
  totalHours?: number;
  date: Date;
  notes?: string;
  status: ClockStatus;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  employeeId?: string;
  password?: string;
  avatar?: string;
  isActive?: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: Omit<User, "password">;
  token: string;
  refreshToken: string;
}

export interface ClockStats {
  totalHours: number;
  totalDays: number;
  averageHoursPerDay: number;
  currentWeekHours: number;
  currentMonthHours: number;
}
