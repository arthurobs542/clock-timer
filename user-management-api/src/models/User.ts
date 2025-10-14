import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  employeeId: string;
  password: string;
  avatar?: string;
}

export class UserModel {
  static async createUser(data: User): Promise<User> {
    return await prisma.user.create({
      data,
    });
  }

  static async getUserById(id: number): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  static async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  static async updateUser(id: number, data: Partial<User>): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  static async deleteUser(id: number): Promise<User> {
    return await prisma.user.delete({
      where: { id },
    });
  }
}
