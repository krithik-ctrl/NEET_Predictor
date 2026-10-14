import { z } from "zod";

export const createCourseSchema = z.object({
  name: z.string().min(2, "Course name is required"),

  description: z.string().optional(),

  status: z.enum(["active", "inactive"]).optional(),
});

// PATCH /courses/:id — every field optional; used for edits and for the
// admin enable/disable toggle ({ status: "active" | "inactive" }).
export const updateCourseSchema = z.object({
  name: z.string().trim().min(2, "Course name is required").optional(),

  description: z.string().optional(),

  level: z.enum(["UG", "PG"]).optional(),

  status: z.enum(["active", "inactive"], {
    message: 'status must be "active" or "inactive"',
  }).optional(),
});

// GET /courses/admin?status=all|active|inactive (defaults to "all").
export const adminCourseListQuerySchema = z.object({
  status: z.enum(["all", "active", "inactive"]).default("all"),
});