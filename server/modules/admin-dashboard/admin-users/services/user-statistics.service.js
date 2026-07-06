import { User } from "../../../users/user.model.js";

import { StudentProfile } from "../../../student-profile/studentProfile.model.js";

import { Subscription } from "../../../subscription/subscription.model.js";

import { Plan } from "../../../plans/plan.model.js";

export const getUserStatistics =
  async () => {

    /*
    |--------------------------------------------------------------------------
    | Find Free Plan
    |--------------------------------------------------------------------------
    */

    const freePlan =
      await Plan.findOne({

        name: /free/i,

      }).lean();

    /*
    |--------------------------------------------------------------------------
    | Counts
    |--------------------------------------------------------------------------
    */

    const [

      totalUsers,

      students,

      activeUsers,

      inactiveUsers,

      verifiedUsers,

      profileCompletedUsers,

      premiumUsers,

      freeUsers,

    ] = await Promise.all([

      User.countDocuments(),

      User.countDocuments({

        role: "student",

      }),

      User.countDocuments({

        isActive: true,

      }),

      User.countDocuments({

        isActive: false,

      }),

      User.countDocuments({

        isVerified: true,

      }),

      StudentProfile.countDocuments({

        profileCompleted: true,

      }),

      Subscription.countDocuments({

        status: "active",

        ...(freePlan && {

          planId: {

            $ne:
              freePlan._id,

          },

        }),

      }),

      Subscription.countDocuments({

        status: "active",

        ...(freePlan && {

          planId:
            freePlan._id,

        }),

      }),

    ]);

    return {

      totalUsers,

      students,

      premiumUsers,

      freeUsers,

      activeUsers,

      inactiveUsers,

      verifiedUsers,

      profileCompletedUsers,

    };

  };