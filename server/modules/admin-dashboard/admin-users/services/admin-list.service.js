import { Admin } from "../../../admin/admin.model.js";

import { Subscription } from "../../../subscription/subscription.model.js";

import { Plan } from "../../../plans/plan.model.js";

const escapeRegex = (v) =>
  String(v).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// USERS_001 quick win — same DB-native filter push as user-list.service.js.
const buildAdminFilter = ({
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

export const getAdminList =
  async (query = {}) => {

    const admins =
      await Admin.find(
        buildAdminFilter(query)
      )
        .lean();

    const adminIds =
      admins.map(
        (admin) => admin._id
      );

    const [

      subscriptions,

      plans,

    ] = await Promise.all([

      Subscription.find({

        userId: {
          $in: adminIds,
        },

        status: "active",

      }).lean(),

      Plan.find().lean(),

    ]);

    const adminList = admins.map((admin) => {

      const subscription =
        subscriptions.find(
          (item) =>
            item.userId.toString() === admin._id.toString()
        );

      const plan =
        subscription
          ? plans.find(
              (item) =>
                item._id.toString() ===
                subscription.planId.toString()
            )
          : null;

      return {

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

        
          plan: plan || null,

        status:
          admin.isActive
            ? "active"
            : "inactive",

        isVerified:
          admin.isVerified,

        profileCompleted: null,

        predictionCount: 0,

        createdAt:
          admin.createdAt,

        lastLogin:
          admin.lastLogin,

        accountType:
          "admin",

      };

    });

    return adminList;

  };