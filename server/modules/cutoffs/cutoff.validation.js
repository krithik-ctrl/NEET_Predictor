import { z } from "zod";

export const createCutoffSchema =
  z.object({
    collegeId: z.string(),

    courseId: z.string(),

    year: z
      .number()
      .min(2000),


    openingRank: z
      .number()
      .min(0),

    closingRank: z
      .number()
      .min(0),

    fees: z
      .number()
      .min(0)
      .optional(),

    seats: z
      .number()
      .min(0)
      .optional(),



    status: z
      .enum([
        "active",
        "inactive",
      ])
      .optional(),
  })
  .refine(
    (data) =>
      data.closingRank >=
      data.openingRank,
    {
      message:
        "Closing rank must be greater than or equal to opening rank",
      path: [
        "closingRank",
      ],
    }
  );