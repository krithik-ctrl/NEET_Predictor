import {
  upsertStudentProfile,
  getStudentProfile,
} from "./studentProfile.service.js";

import {
  studentProfileSchema,
} from "./studentProfile.validation.js";

export const upsertStudentProfileController =
  async (req, res, next) => {

    try {

      const validatedData =
        studentProfileSchema.parse(
          req.body
        );

      const profile =
        await upsertStudentProfile(
          req.user.userId,
          validatedData
        );

      res.status(200).json({

        success: true,

        message:
          "Profile updated successfully",

        data: profile,

      });

    } catch (error) {

      next(error);

    }

  };

export const getStudentProfileController =
  async (req, res, next) => {

    try {

      const profile =
        await getStudentProfile(
          req.user.userId
        );

      res.status(200).json({

        success: true,

        data: profile,

      });

    } catch (error) {

      next(error);

    }

  };