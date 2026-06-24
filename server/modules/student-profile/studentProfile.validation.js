import { z } from "zod";

export const studentProfileSchema =
  z.object({
    rank: z.number().optional(),

    score: z.number().optional(),

    category: z
      .enum([
        "General",
        "OBC",
        "SC",
        "ST",
        "EWS",
      ])
      .optional(),

    quota: z
      .enum([
        "AIQ",
        "State",
        "Management",
      ])
      .optional(),

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

    domicileState:
      z.string().optional(),

    budget:
      z.number().optional(),

    preferredCourse:
      z.string().optional(),
  });