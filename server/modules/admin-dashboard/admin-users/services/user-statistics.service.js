import { User } from "../../../users/user.model.js";

import { StudentProfile } from "../../../student-profile/studentProfile.model.js";

import { Subscription } from "../../../subscription/subscription.model.js";

import { Plan } from "../../../plans/plan.model.js";
import { Admin } from "../../../admin/admin.model.js";



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

  superAdmins,

  subAdmins,

  counsellors,

  activeUsers,

  inactiveUsers,

  verifiedUsers,

  profileCompletedUsers,

  premiumUsers,

  freeUsers,

] = await Promise.all([

    Promise.all([
  User.countDocuments(),
  Admin.countDocuments(),
]).then(
  ([users, admins]) =>
    users + admins
),

      User.countDocuments({

        role: "student",

      }),
      Admin.countDocuments({
  role: "admin",
}),

Admin.countDocuments({
  role: "sub-admin",
}),

0,

      User.countDocuments({

        isActive: true,

      }),

      User.countDocuments({

        isActive: false,

      }),

      User.countDocuments({

        isVerified: true,

      }),

      Admin.countDocuments({

        isActive: true,

      }),

      Admin.countDocuments({

        isActive: false,

      }),

      Admin.countDocuments({

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

  superAdmins,

  subAdmins,

  counsellors,

  premiumUsers,

  freeUsers,

  activeUsers,

  inactiveUsers,

  verifiedUsers,

  profileCompletedUsers,

};

  };