import { StudentProfile } from "./studentProfile.model.js";
import { Course } from "../courses/course.model.js";
import { User } from "../users/user.model.js";



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

    if (
      payload.preferredCourse
    ) {

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

    // Update User information

    await User.findByIdAndUpdate(
      userId,
      {
        ...(payload.firstName && {
          firstName:
            payload.firstName,
        }),

        ...(payload.lastName && {
          lastName:
            payload.lastName,
        }),

        ...(payload.avatar !==
          undefined && {
          avatar:
            payload.avatar,
        }),
      },
      {
        new: true,
      }
    );

    // Remove User fields before updating Student Profile

    delete payload.firstName;
    delete payload.lastName;
    delete payload.avatar;

    const existingProfile =
      await StudentProfile.findOne({
        userId,
      });

    const updatedData = {

      ...(existingProfile?.toObject() ||
        {}),

      ...payload,

    };

    updatedData.profileCompleted =
      Boolean(
        updatedData.gender &&
          updatedData.state &&
          updatedData.city
      );

    return await StudentProfile.findOneAndUpdate(
      {
        userId,
      },
      updatedData,
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

    const profile =
      await StudentProfile
        .findOne({ userId })
        .populate("preferredCourse");

    const user =
      await User.findById(userId);

    return {

      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      avatar: user.avatar,

      gender: profile?.gender ?? null,
      pwdStatus: profile?.pwdStatus ?? false,
      state: profile?.state ?? null,
      city: profile?.city ?? null,
      budget: profile?.budget ?? null,
      preferredCourse: profile?.preferredCourse ?? null,
      profileCompleted: profile?.profileCompleted ?? false,

    };

  };

export const createStudentProfile =
  async (userId) => {

    const existingProfile =
      await StudentProfile.findOne({
        userId,
      });

    if (existingProfile) {
      return existingProfile;
    }

    return await StudentProfile.create({
      userId,
      profileCompleted: false,
    });

};