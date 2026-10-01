import { User } from "../../../users/user.model.js";

import { StudentProfile } from "../../../student-profile/studentProfile.model.js";

import { Subscription } from "../../../subscription/subscription.model.js";

import { Plan } from "../../../plans/plan.model.js";

import { PredictionHistory } from "../../../prediction-history/predictionHistory.model.js";

import { Course } from "../../../courses/course.model.js"; // NEW - adjust path to your actual Course model location

// Regex-escape a search term so user input can't break out of the pattern.
const escapeRegex = (v) =>
  String(v).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// USERS_001 quick win — push the DB-native filters (search/role/status/
// verified) into the initial find() instead of loading every user on every
// request. `plan`/`profileCompleted` still need the joined Subscription/
// StudentProfile data, so those stay in filterUsers() downstream exactly as
// before — this only narrows what feeds into that step.
const buildUserFilter = ({
  search,
  role,
  status,
  verified,
} = {}) => {

  const filter = {};

  if (search?.trim()) {
    const regex = {
      $regex: escapeRegex(search.trim()),
      $options: "i",
    };
    filter.$or = [
      { firstName: regex },
      { lastName: regex },
      { email: regex },
      { mobile: regex },
    ];
  }

  if (role) filter.role = role;

  if (status === "active") filter.isActive = true;
  else if (status === "inactive") filter.isActive = false;

  if (verified !== undefined) {
    filter.isVerified = verified === "true";
  }

  return filter;

};

export const getUserList =
  async (query = {}) => {

    const users =
      await User.find(
        buildUserFilter(query)
      )
        .lean();

    const userIds =
      users.map(
        (user) => user._id
      );

    const [

      profiles,

      subscriptions,

      plans,

      predictions,

      courses, // NEW

    ] = await Promise.all([

      StudentProfile.find({

        userId: {
          $in: userIds,
        },

      }).lean(),

      Subscription.find({

        userId: {
          $in: userIds,
        },

        status: "active",

      }).lean(),

      Plan.find().lean(),

      PredictionHistory.aggregate([

        {
          $match: {

            userId: {
              $in: userIds,
            },

          },

        },

        {
          $group: {

            _id: "$userId",

            count: {
              $sum: 1,
            },

          },

        },

      ]),

      Course.find().lean(), // NEW

    ]);

   const studentUsers = users.map((user) => {

  const profile =
    profiles.find(
      (item) =>
        item.userId.toString() === user._id.toString()
    );

  const subscription =
    subscriptions.find(
      (item) =>
        item.userId.toString() === user._id.toString()
    );

  const plan =
    subscription
      ? plans.find(
          (item) =>
            item._id.toString() ===
            subscription.planId.toString()
        )
      : null;

  const prediction =
    predictions.find(
      (item) =>
        item._id.toString() === user._id.toString()
    );

  const course =
    profile?.preferredCourse
      ? courses.find(
          (item) =>
            item._id.toString() ===
            profile.preferredCourse.toString()
        )
      : null;

  return {

    ...user,

    role: user.role || "student",
status: user.isActive
    ? "active"
    : "inactive",
    profile,

    plan,

    predictionCount:
      prediction?.count || 0,

     preferredCourse:
      profile?.preferredCourse
        ? profile.preferredCourse.toString()   // CHANGED — now the ID, used for filtering
        : null,

    preferredCourseName:
      course?.name || null,  

    // ADMIN_V2 — top-level, NA-safe. A student with no StudentProfile
    // document counts as not completed; rank is null when not set.
    profileCompleted:
      profile?.profileCompleted === true,

    rank:
      profile?.rank ?? null,

  };

});

return studentUsers;
  };