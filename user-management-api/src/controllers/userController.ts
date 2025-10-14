import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const userData = req.body;
      const newUser = await this.userService.createUser(userData);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating user', error });
    }
  }

  public async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving user', error });
    }
  }

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving users', error });
    }
  }
}