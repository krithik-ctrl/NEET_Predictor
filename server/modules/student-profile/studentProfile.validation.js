import { z } from "zod";

export const studentProfileSchema =
  z.object({

    gender: z
      .enum([
        "Male",
        "Female",
        "Other",
      ])
      .optional(),

    pwdStatus:
      z.boolean().optional(),

    state:
      z.string().optional(),

    city:
      z.string().optional(),

    budget:
      z.number().optional(),

    preferredCourse:
      z.string().optional(),
      firstName: z.string().optional(),

lastName: z.string().optional(),

avatar: z.string().optional(),

  });