import prisma from "../config/database";
import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  LoginRequest,
} from "../types";
import {
  hashPassword,
  comparePasswords,
  validatePassword,
} from "../utils/password";

export class UserService {
  async createUser(
    userData: CreateUserRequest
  ): Promise<Omit<User, "password">> {
    // Validar senha
    if (!validatePassword(userData.password)) {
      throw new Error(
        "Senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números"
      );
    }

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw new Error("Email já está em uso");
    }

    // Verificar se employeeId já existe
    const existingEmployee = await prisma.user.findUnique({
      where: { employeeId: userData.employeeId },
    });

    if (existingEmployee) {
      throw new Error("ID do funcionário já está em uso");
    }

    // Hash da senha
    const hashedPassword = await hashPassword(userData.password);

    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        employeeId: true,
        avatar: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async getUserById(userId: string): Promise<Omit<User, "password"> | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        employeeId: true,
        avatar: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async getAllUsers(
    page: number = 1,
    limit: number = 10
  ): Promise<{
    users: Omit<User, "password">[];
    total: number;
    pages: number;
  }> {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          employeeId: true,
          avatar: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count(),
    ]);

    return {
      users,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  async updateUser(
    userId: string,
    userData: UpdateUserRequest
  ): Promise<Omit<User, "password">> {
    // Verificar se usuário existe
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new Error("Usuário não encontrado");
    }

    // Se email está sendo atualizado, verificar se já existe
    if (userData.email && userData.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (emailExists) {
        throw new Error("Email já está em uso");
      }
    }

    // Se employeeId está sendo atualizado, verificar se já existe
    if (
      userData.employeeId &&
      userData.employeeId !== existingUser.employeeId
    ) {
      const employeeIdExists = await prisma.user.findUnique({
        where: { employeeId: userData.employeeId },
      });

      if (employeeIdExists) {
        throw new Error("ID do funcionário já está em uso");
      }
    }

    const updateData: any = { ...userData };

    // Se senha está sendo atualizada, fazer hash
    if (userData.password) {
      if (!validatePassword(userData.password)) {
        throw new Error(
          "Senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números"
        );
      }
      updateData.password = await hashPassword(userData.password);
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        employeeId: true,
        avatar: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    await prisma.user.delete({
      where: { id: userId },
    });
  }

  async login(loginData: LoginRequest): Promise<User> {
    const user = await this.getUserByEmail(loginData.email);

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    if (!user.isActive) {
      throw new Error("Conta desativada");
    }

    const isPasswordValid = await comparePasswords(
      loginData.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas");
    }

    return user;
  }

  async deactivateUser(userId: string): Promise<Omit<User, "password">> {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        employeeId: true,
        avatar: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }
}
