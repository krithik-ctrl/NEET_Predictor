import { Plan } from "./plan.model.js";
import { Subscription } from "../subscription/subscription.model.js";
import { Payment } from "../payment/payment.model.js";

export const createPlan =
  async (payload) => {

    const existingPlan =
      await Plan.findOne({
        name: payload.name,
      });

    if (existingPlan) {
      throw new Error(
        "Plan already exists"
      );
    }

    return await Plan.create(
      payload
    );
  };

export const getPlans =
  async () => {

    return await Plan.find({
      status: "active",
    }).sort({
      price: 1,
    });
  };

export const getPlanById =
  async (id) => {

    const plan =
      await Plan.findById(id);

    if (!plan) {
      throw new Error(
        "Plan not found"
      );
    }

    return plan;
  };

export const updatePlan =
  async (
    id,
    payload
  ) => {

    const plan =
      await Plan.findByIdAndUpdate(
        id,
        payload,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!plan) {
      throw new Error(
        "Plan not found"
      );
    }

    return plan;
  };

export const deletePlan =
  async (id) => {

    const plan =
      await Plan.findById(id);

    if (!plan) {
      throw new Error(
        "Plan not found"
      );
    }

    // Snapshot the plan name onto existing subscriptions and payments
    // before the hard delete, so history still shows which plan they
    // were for once planId no longer populates.
    await Promise.all([

      Subscription.updateMany(
        {
          planId: plan._id,
          planName: null,
        },
        {
          $set: {
            planName: plan.name,
          },
        }
      ),

      Payment.updateMany(
        {
          planId: plan._id,
          planName: null,
        },
        {
          $set: {
            planName: plan.name,
          },
        }
      ),

    ]);

    await Plan.findByIdAndDelete(
      plan._id
    );

    return plan;
  };
