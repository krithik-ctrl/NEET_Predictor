import { hardDeleteByIds } from "../../common/utils/bulkDelete.js";
import { Subscription }
from "./subscription.model.js";

import { Plan }
from "../plans/plan.model.js";

import { User }
from "../users/user.model.js";


export const createSubscription =
  async (data) => {

    const user =
      await User.findById(
        data.userId
      );

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    const plan =
      await Plan.findById(
        data.planId
      );

    if (!plan) {
      throw new Error(
        "Plan not found"
      );
    }

    const existing =
      await Subscription.findOne({
        userId: data.userId,
        status: "active",
      });

    if (existing) {
      throw new Error(
        "User already has an active subscription"
      );
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

    return await Subscription.create({

      userId:
        data.userId,

      planId:
        data.planId,

      planName:
        plan.name,

      endDate,

    });

  };

export const getSubscriptions =
  async () => {

    return await Subscription
      .find()
      .populate("userId")
      .populate("planId");

  };

export const getSubscriptionById =
  async (id) => {

    const subscription =
      await Subscription
        .findById(id)
        .populate("userId")
        .populate("planId");

    if (!subscription) {
      throw new Error(
        "Subscription not found"
      );
    }

    return subscription;

  };

export const updateSubscription =
  async (
    id,
    data
  ) => {

    const subscription =
      await Subscription.findByIdAndUpdate(
        id,
        data,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!subscription) {
      throw new Error(
        "Subscription not found"
      );
    }

    return subscription;

  };

export const deleteSubscription =
  async (id) => {

    const subscription =
      await Subscription.findByIdAndDelete(
        id
      );

    if (!subscription) {
      throw new Error(
        "Subscription not found"
      );
    }

    return;

  };
/*
|--------------------------------------------------------------------------
| ADMIN_V2 — Paginated list (?page / ?limit). No page/limit → legacy
| unpaginated array (unchanged), so the live page keeps working.
|--------------------------------------------------------------------------
*/

export const getSubscriptionsPaginated =
  async (query = {}) => {

    const pageNum = Math.max(Number(query.page) || 1, 1);
    const limitNum = Math.min(Math.max(Number(query.limit) || 20, 1), 100);

    const [data, total] = await Promise.all([
      Subscription
        .find()
        .populate("userId")
        .populate("planId")
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Subscription.countDocuments(),
    ]);

    return {
      data,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    };

  };

/*
|--------------------------------------------------------------------------
| ADMIN_V2 — Bulk hard delete (same as the single delete)
|--------------------------------------------------------------------------
*/

export const bulkDeleteSubscriptions =
  async (ids, skipped) =>
    hardDeleteByIds(Subscription, ids, skipped);
