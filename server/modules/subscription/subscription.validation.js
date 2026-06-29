import { z } from "zod";

export const createSubscriptionSchema =
  z.object({
    userId: z.string(),

    planId: z.string(),
  });

export const updateSubscriptionSchema =
  z.object({
    status: z
      .enum([
        "active",
        "expired",
        "cancelled",
      ])
      .optional(),

    endDate: z
      .string()
      .optional(),
  });