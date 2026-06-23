import { z } from "zod";

export const createCourseSchema = z.object({
  name: z.string().min(2, "Course name is required"),

  description: z.string().optional(),

  status: z.enum(["active", "inactive"]).optional(),
});