import { Admin } from "../../../admin/admin.model.js";
import { Subscription } from "../../../subscription/subscription.model.js";

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

    // small change: fetch active subscription for this admin
    const subscription =
      await Subscription.findOne({
        userId: adminId,
        status: "active",
      })
      .populate("planId")
      .lean();

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

      createdAt:
        admin.createdAt,

      lastLogin:
        admin.lastLogin,

      // small change: attach subscription details
     subscription: {

        plan:
          subscription?.planId?.name ||
          null,

        status:
          subscription?.status ||
          null,

        startDate:
          subscription?.startDate ||
          null,

        endDate:
          subscription?.endDate ||
          null,

      },

    };

  };