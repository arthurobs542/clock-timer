import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { AuthRequest } from "../middleware/auth";
import { CreateUserRequest, UpdateUserRequest, LoginRequest } from "../types";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async register(req: Request, res: Response): Promise<Response> {
    try {
      const userData: CreateUserRequest = req.body;
      const newUser = await this.userService.createUser(userData);

      return res.status(201).json({
        message: "Usuário criado com sucesso",
        user: newUser,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao criar usuário",
      });
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    try {
      const loginData: LoginRequest = req.body;
      const user = await this.userService.login(loginData);

      // Gerar tokens JWT
      const { generateToken, generateRefreshToken } = await import(
        "../utils/jwt"
      );

      const token = generateToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      const refreshToken = generateRefreshToken({
        userId: user.id,
        email: user.email,
        role: user.role,
      });

      // Remover senha do objeto de resposta
      const { password, ...userWithoutPassword } = user;

      return res.status(200).json({
        message: "Login realizado com sucesso",
        user: userWithoutPassword,
        token,
        refreshToken,
      });
    } catch (error: any) {
      return res.status(401).json({
        message: error.message || "Erro ao fazer login",
      });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(200).json({
        message: "Usuário encontrado",
        user,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Erro ao buscar usuário",
      });
    }
  }

  public async getProfile(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId = req.user!.id;
      const user = await this.userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(200).json({
        message: "Perfil encontrado",
        user,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Erro ao buscar perfil",
      });
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await this.userService.getAllUsers(page, limit);

      return res.status(200).json({
        message: "Usuários encontrados",
        ...result,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || "Erro ao buscar usuários",
      });
    }
  }

  public async updateUser(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      const userData: UpdateUserRequest = req.body;

      // Verificar se o usuário pode atualizar (próprio perfil ou admin)
      if (req.user!.role !== "ADMIN" && req.user!.id !== userId) {
        return res.status(403).json({
          message: "Você só pode atualizar seu próprio perfil",
        });
      }

      const updatedUser = await this.userService.updateUser(userId, userData);

      return res.status(200).json({
        message: "Usuário atualizado com sucesso",
        user: updatedUser,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao atualizar usuário",
      });
    }
  }

  public async deleteUser(req: AuthRequest, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;

      // Verificar se é admin
      if (req.user!.role !== "ADMIN") {
        return res.status(403).json({
          message: "Apenas administradores podem deletar usuários",
        });
      }

      await this.userService.deleteUser(userId);

      return res.status(200).json({
        message: "Usuário deletado com sucesso",
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao deletar usuário",
      });
    }
  }

  public async deactivateUser(
    req: AuthRequest,
    res: Response
  ): Promise<Response> {
    try {
      const userId = req.params.id;

      // Verificar se é admin
      if (req.user!.role !== "ADMIN") {
        return res.status(403).json({
          message: "Apenas administradores podem desativar usuários",
        });
      }

      const user = await this.userService.deactivateUser(userId);

      return res.status(200).json({
        message: "Usuário desativado com sucesso",
        user,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao desativar usuário",
      });
    }
  }
}
