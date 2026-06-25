import { z } from "zod";

export const collegeIdSchema =
  z.object({
    collegeId: z
      .string()
      .min(1, "College ID is required"),
  });