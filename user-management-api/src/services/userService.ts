import { PrismaClient } from '@prisma/client';
import { User } from '../models/User';

const prisma = new PrismaClient();

export class UserService {
  async createUser(userData: User): Promise<User> {
    const user = await prisma.user.create({
      data: userData,
    });
    return user;
  }

  async getUserById(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User | null> {
    const user = await prisma.user.update({
      where: { id: userId },
      data: userData,
    });
    return user;
  }

  async deleteUser(userId: string): Promise<User | null> {
    const user = await prisma.user.delete({
      where: { id: userId },
    });
    return user;
  }
}