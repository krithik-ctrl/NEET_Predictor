import { Plan } from "./plan.model.js";

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
      await Plan.findByIdAndUpdate(
        id,
        {
          status:
            "inactive",
        },
        {
          new: true,
        }
      );

    if (!plan) {
      throw new Error(
        "Plan not found"
      );
    }

    return plan;
  };