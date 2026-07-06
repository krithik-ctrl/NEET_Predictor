import { Admin } from "../../../admin/admin.model.js";

export const getAdminDetails =
  async (adminId) => {

    const admin =
      await Admin.findById(
        adminId
      )
      .populate(
        "createdBy",
        "firstName lastName"
      )
      .lean();

    if (!admin) {
      throw new Error(
        "Admin not found."
      );
    }

    return {

      id:
        admin._id,

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

      isVerified:
        admin.isVerified,

      isActive:
        admin.isActive,

      createdBy:
        admin.createdBy
          ? {

              id:
                admin.createdBy._id,

              name:
                `${admin.createdBy.firstName} ${admin.createdBy.lastName}`,

            }
          : null,

      joinedDate:
        admin.createdAt,

      lastLogin:
        admin.lastLogin,

    };

  };