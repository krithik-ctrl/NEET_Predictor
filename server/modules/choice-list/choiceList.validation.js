import { z } from "zod";

export const createChoiceListSchema =
  z.object({
    name: z
      .string()
      .min(
        3,
        "Choice list name is required"
      ),
  });

export const addCollegeSchema =
  z.object({
    collegeId: z
      .string()
      .min(
        1,
        "College ID is required"
      ),
  });

export const updatePrioritySchema =
  z.object({
    priority: z
      .number()
      .min(1),
  });