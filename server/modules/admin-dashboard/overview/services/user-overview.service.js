import { User } from "../../../users/user.model.js";
import { StudentProfile } from "../../../student-profile/studentProfile.model.js";

export const getUserOverview = async () => {
  const [
    totalUsers,
    activeUsers,
    inactiveUsers,
    verifiedUsers,
    unverifiedUsers,
    premiumUsers,
    freeUsers,
    completedProfiles,
    recentUsers,
  ] = await Promise.all([
    User.countDocuments(),

    User.countDocuments({
      isActive: true,
    }),

    User.countDocuments({
      isActive: false,
    }),

    User.countDocuments({
      isVerified: true,
    }),

    User.countDocuments({
      isVerified: false,
    }),

    User.countDocuments({
      isPremium: true,
    }),

    User.countDocuments({
      isPremium: false,
    }),

    StudentProfile.countDocuments({
      profileCompleted: true,
    }),

    User.find({})
      .select(
        "firstName lastName email role createdAt"
      )
      .sort({
        createdAt: -1,
      })
      .limit(5)
      .lean(),
  ]);

  return {
    users: {
      total: totalUsers,
      active: activeUsers,
      inactive: inactiveUsers,
      verified: verifiedUsers,
      unverified: unverifiedUsers,
      premium: premiumUsers,
      free: freeUsers,
      profileCompleted: completedProfiles,
    },

    recentUsers: recentUsers.map((user) => ({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
      joinedAt: user.createdAt,
    })),
  };
};