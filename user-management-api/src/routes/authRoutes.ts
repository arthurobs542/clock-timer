import { Router } from "express";
import { UserController } from "../controllers/userController";
import { validateBody } from "../middleware/validation";
import { registerSchema, loginSchema } from "../schemas/authSchemas";

const router = Router();
const userController = new UserController();

// Rotas públicas
router.post("/register", validateBody(registerSchema), userController.register);
router.post("/login", validateBody(loginSchema), userController.login);

export const authRoutes = router;
