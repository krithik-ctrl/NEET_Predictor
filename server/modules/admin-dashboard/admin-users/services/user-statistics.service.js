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

  userActive,

  userInactive,

  userVerified,

  adminActive,

  adminInactive,

  adminVerified,

  profileCompletedUsers,

  premiumUsers,

  freeUsers,

  superAdminCount,

] = await Promise.all([

  Promise.all([
    User.countDocuments(),
    Admin.countDocuments(),
  ]).then(([users, admins]) => users + admins),

  User.countDocuments({
    role: "student",
  }),

  Admin.countDocuments({
    role: "admin",
  }),

  Admin.countDocuments({
    role: "sub-admin",
  }),

  Promise.resolve(0),

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
        $ne: freePlan._id,
      },
    }),
  }),

  Subscription.countDocuments({
    status: "active",
    ...(freePlan && {
      planId: freePlan._id,
    }),
  }),

  Admin.countDocuments({
    role: "super-admin",
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

  activeUsers:
    userActive + adminActive,

  inactiveUsers:
    userInactive + adminInactive,

  verifiedUsers:
    userVerified + adminVerified,

  profileCompletedUsers,

  // NEW — actual count of role:"super-admin" (the existing "superAdmins"
  // key above counts role:"admin" and is left unchanged for compatibility).
  superAdminCount,

};

  };