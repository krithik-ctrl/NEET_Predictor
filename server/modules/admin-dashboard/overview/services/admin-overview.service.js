import { Admin } from "../../../admin/admin.model.js";

export const getAdminOverview = async () => {
  const [
    totalAdmins,
    activeAdmins,
    inactiveAdmins,
    verifiedAdmins,
    unverifiedAdmins,
    subAdmins,
  ] = await Promise.all([
    Admin.countDocuments(),

    Admin.countDocuments({
      isActive: true,
    }),

    Admin.countDocuments({
      isActive: false,
    }),

    Admin.countDocuments({
      isVerified: true,
    }),

    Admin.countDocuments({
      isVerified: false,
    }),

    Admin.countDocuments({
      role: "sub-admin",
    }),
  ]);

  return {
    admins: {
      total: totalAdmins,
      active: activeAdmins,
      inactive: inactiveAdmins,
      verified: verifiedAdmins,
      unverified: unverifiedAdmins,
      subAdmins,
    },
  };
};