import { z } from "zod";

export const clockInSchema = z.object({
  notes: z.string().optional(),
});

export const clockOutSchema = z.object({
  notes: z.string().optional(),
});

export const breakSchema = z.object({
  type: z.enum(["start", "end"]),
  notes: z.string().optional(),
});

export const getClockRecordsSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  userId: z.string().uuid().optional(),
  page: z.string().transform(Number).pipe(z.number().min(1)).optional(),
  limit: z
    .string()
    .transform(Number)
    .pipe(z.number().min(1).max(100))
    .optional(),
});

export const updateClockRecordSchema = z.object({
  clockIn: z.string().datetime().optional(),
  clockOut: z.string().datetime().optional(),
  breakStart: z.string().datetime().optional(),
  breakEnd: z.string().datetime().optional(),
  notes: z.string().optional(),
  status: z.enum(["ACTIVE", "COMPLETED", "CANCELLED"]).optional(),
});

export type ClockInInput = z.infer<typeof clockInSchema>;
export type ClockOutInput = z.infer<typeof clockOutSchema>;
export type BreakInput = z.infer<typeof breakSchema>;
export type GetClockRecordsInput = z.infer<typeof getClockRecordsSchema>;
export type UpdateClockRecordInput = z.infer<typeof updateClockRecordSchema>;
