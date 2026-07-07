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

  export const verifyPaymentSchema =
  z.object({

    orderId:
      z.string(),

    paymentId:
      z.string(),

    signature:
      z.string(),

  });