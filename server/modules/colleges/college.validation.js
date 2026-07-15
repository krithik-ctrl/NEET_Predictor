import { z } from "zod";

export const createCollegeSchema =
  z.object({
    name: z
      .string()
      .min(2),

    state: z
      .string()
      .min(2),

    city: z
      .string()
      .min(2),

    ownership: z.enum([
      "Government",
      "Private",
      "Deemed",
    ]),

    // collegeType: z.enum([
    //   "Medical",
    //   "Dental",
    //   "Ayush",
    // ]),

    courses: z
      .array(z.string())
      .min(
        1,
        "At least one course is required"
      ),

    website: z
      .string()
      .optional(),

    status: z
      .enum([
        "active",
        "inactive",
      ])
      .optional(),
  });