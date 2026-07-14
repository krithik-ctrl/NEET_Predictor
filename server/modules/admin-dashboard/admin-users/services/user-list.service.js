import { User } from "../../../users/user.model.js";

import { StudentProfile } from "../../../student-profile/studentProfile.model.js";

import { Subscription } from "../../../subscription/subscription.model.js";

import { Plan } from "../../../plans/plan.model.js";

import { PredictionHistory } from "../../../prediction-history/predictionHistory.model.js";

export const getUserList =
  async () => {

    const users =
      await User.find()
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

  };

});

return studentUsers;
  };