import { Plan }
from "../plans/plan.model.js";

import { Subscription }
from "./subscription.model.js";

import { User } from "../users/user.model.js";
import { Admin } from "../admin/admin.model.js";

export const createFreeSubscription =
  async (userId) => {

    // small change: confirm owner exists as either User or Admin
    const owner =
      (await User.findById(userId)) ||
      (await Admin.findById(userId));

      console.log("id:",owner)
    if (!owner) {
      throw new Error(
        "No user or admin found with this id"
      );
    }

    const freePlan =
      await Plan.findOne({
        name: "Free",
        status: "active",
      });

    if (!freePlan) {
      throw new Error(
        "Free plan not found"
      );
    }

    return await Subscription.create({

      userId,

      planId:
        freePlan._id,

      startDate:
        new Date(),

      endDate: null,

      status: "active",

    });

  };

  export const getUserSubscription =
  async (userId) => {

    // no change needed here — query is by plain userId field,
    // works the same whether it belongs to a User or Admin
    const subscription =
      await Subscription
        .findOne({
          userId,
          status: "active",
        })
        .populate("planId");

    if (!subscription) {
      throw new Error(
        "Subscription not found"
      );
    }

    return subscription;

  };
    
  
  export const checkSubscription =
  async (userId) => {

    // no change needed — depends only on getUserSubscription above
    const subscription =
      await getUserSubscription(
        userId
      );

    return {

      subscription,

      plan:
        subscription.planId.name,

      isFree:
        subscription.planId.name ===
        "Free",

      isPremium:
        subscription.planId.name.startsWith(
          "Premium"
        ),

    };

  };

export const activatePremiumSubscription =
  async (
    userId,
    planId
  ) => {

    const plan =
      await Plan.findById(
        planId
      );

    if (!plan) {
      throw new Error(
        "Plan not found"
      );
    }

    const activeSubscription =
      await Subscription.findOne({
        userId,
        status: "active",
      });

    if (activeSubscription) {

      activeSubscription.status =
        "cancelled";

      activeSubscription.endDate =
        new Date();

      await activeSubscription.save();

    }

    let endDate = null;

    if (plan.duration > 0) {

      endDate =
        new Date();

      endDate.setDate(
        endDate.getDate() +
        plan.duration
      );

    }

    const user = await User.findById(userId);

    if (user) {
      await User.findByIdAndUpdate(
        userId,
        {
          isPremium: true,
        }
      );
    } else {
      await Admin.findByIdAndUpdate(
        userId,
        {
          isPremium: true,
        }
      );
    }

    return await Subscription.create({

      userId,

      planId,

      startDate:
        new Date(),

      endDate,

      status:
        "active",

    });

  };