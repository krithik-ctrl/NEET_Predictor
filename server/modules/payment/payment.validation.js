import { z } from "zod";

export const createPaymentSchema =
  z.object({

    planId:
      z.string(),

  });

export const updatePaymentStatusSchema =
  z.object({

    status: z.enum([
      "pending",
      "success",
      "failed",
      "cancelled",
    ]),

  });