import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authenticate, authorize } from "../middleware/auth";
import { validateBody, validateQuery } from "../middleware/validation";
import { updateUserSchema } from "../schemas/authSchemas";
import { z } from "zod";

const router = Router();
const userController = new UserController();

// Schema para paginação
const paginationSchema = z.object({
  page: z.string().transform(Number).pipe(z.number().min(1)).optional(),
  limit: z
    .string()
    .transform(Number)
    .pipe(z.number().min(1).max(100))
    .optional(),
});

// Rotas protegidas
router.get("/profile", authenticate, userController.getProfile);
router.put(
  "/profile",
  authenticate,
  validateBody(updateUserSchema),
  userController.updateUser
);

// Rotas para administradores
router.get(
  "/",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  validateQuery(paginationSchema),
  userController.getAllUsers
);
router.get(
  "/:id",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  userController.getUserById
);
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validateBody(updateUserSchema),
  userController.updateUser
);
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  userController.deleteUser
);
router.patch(
  "/:id/deactivate",
  authenticate,
  authorize("ADMIN"),
  userController.deactivateUser
);

export const userRoutes = router;
