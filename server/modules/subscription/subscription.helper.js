import { Plan }
from "../plans/plan.model.js";

import { Subscription }
from "./subscription.model.js";

export const createFreeSubscription =
  async (userId) => {

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
        subscription.planId.name ===
        "Premium",

    };

  };