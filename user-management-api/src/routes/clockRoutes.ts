import { Router } from "express";
import { ClockController } from "../controllers/clockController";
import { authenticate, authorize } from "../middleware/auth";
import { validateBody, validateQuery } from "../middleware/validation";
import {
  clockInSchema,
  clockOutSchema,
  breakSchema,
  getClockRecordsSchema,
} from "../schemas/clockSchemas";

const router = Router();
const clockController = new ClockController();

// Rotas protegidas para funcionários
router.post(
  "/clock-in",
  authenticate,
  validateBody(clockInSchema),
  clockController.clockIn
);
router.post(
  "/clock-out",
  authenticate,
  validateBody(clockOutSchema),
  clockController.clockOut
);
router.post(
  "/break/start",
  authenticate,
  validateBody(breakSchema),
  clockController.startBreak
);
router.post(
  "/break/end",
  authenticate,
  validateBody(breakSchema),
  clockController.endBreak
);
router.get("/status", authenticate, clockController.getCurrentStatus);
router.get(
  "/records",
  authenticate,
  validateQuery(getClockRecordsSchema),
  clockController.getClockRecords
);
router.get("/stats", authenticate, clockController.getClockStats);

// Rotas para administradores
router.get(
  "/admin/records",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  validateQuery(getClockRecordsSchema),
  clockController.getAllClockRecords
);

export const clockRoutes = router;
