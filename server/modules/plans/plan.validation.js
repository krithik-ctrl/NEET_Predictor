import { z } from "zod";

export const createPlanSchema =
  z.object({
    body: z.object({
      name: z
        .string()
        .trim()
        .min(2),

      description:
        z.string().trim(),

      price: z
        .number()
        .min(0),

      duration:
        z.number().min(0),

      features: z.array(
        z.string()
      ),

      status: z
        .enum([
          "active",
          "inactive",
        ])
        .optional(),
    }),
  });

export const updatePlanSchema =
  z.object({
    body: z.object({
      name: z
        .string()
        .trim()
        .min(2)
        .optional(),

      description:
        z.string().trim().optional(),

      price: z
        .number()
        .min(0)
        .optional(),

      duration:
        z.number().min(0).optional(),

      features:
        z.array(
          z.string()
        ).optional(),

      status: z
        .enum([
          "active",
          "inactive",
        ])
        .optional(),
    }),
  });