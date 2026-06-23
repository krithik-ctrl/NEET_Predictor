import { z } from "zod";

export const registerUserSchema =
  z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters"),

    email: z.email("Invalid email address"),

    password: z
      .string()
      .min(
        8,
        "Password must be at least 8 characters"
      ),

    role: z
      .enum([
        "student",
        "admin",
        "counsellor",
      ])
      .optional(),
  });

export const loginUserSchema =
  z.object({
    email: z.email("Invalid email address"),

    password: z
      .string()
      .min(1, "Password is required"),
  });