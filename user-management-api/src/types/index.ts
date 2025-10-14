// src/types/index.ts

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
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
}