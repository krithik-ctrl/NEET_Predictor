import { Admin } from "../../../admin/admin.model.js";

export const getAdminList =
  async () => {

    const admins =
      await Admin.find()
        .lean();

    return admins.map(
      (admin) => ({

        id: admin._id,

        firstName:
          admin.firstName,

        lastName:
          admin.lastName,

        email:
          admin.email,

        mobile:
          admin.mobile,

        role:
          admin.role,

        plan: null,

        status:
          admin.isActive
            ? "active"
            : "inactive",

        isVerified:
          admin.isVerified,

        profileCompleted: null,

        predictionCount: 0,

        joinedDate:
          admin.createdAt,

        lastLogin:
          admin.lastLogin,

        accountType:
          "admin",

      })
    );

  };