import { z } from "zod";

export const predictionHistoryIdSchema =
  z.object({
    id: z
      .string()
      .min(
        1,
        "History ID is required"
      ),
  });