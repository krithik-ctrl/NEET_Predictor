import { StudentProfile } from "./studentProfile.model.js";
import { Course } from "../courses/course.model.js";
export const upsertStudentProfile =
  async (
    userId,
    payload
  ) => {

    if (!userId) {
      throw new Error(
        "User ID is required"
      );
    }

    if (payload.preferredCourse) {
      const course =
        await Course.findById(
          payload.preferredCourse
        );

      if (!course) {
        throw new Error(
          "Course not found"
        );
      }
    }

    return await StudentProfile.findOneAndUpdate(
      { userId },
      {
        ...payload,
        profileCompleted: true,
      },
      {
        new: true,
        upsert: true,
      }
    ).populate(
      "preferredCourse"
    );
  };

export const getStudentProfile =
  async (userId) => {
    return await StudentProfile
      .findOne({ userId })
      .populate(
        "preferredCourse"
      );
  };