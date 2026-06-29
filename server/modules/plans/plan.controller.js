import {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  deletePlan,
} from "./plan.service.js";

export const createPlanController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const plan =
        await createPlan(
          req.body
        );

      res.status(201).json({
        success: true,
        message:
          "Plan created successfully",
        data: plan,
      });

    } catch (error) {
      next(error);
    }
  };

export const getPlansController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const plans =
        await getPlans();

      res.status(200).json({
        success: true,
        data: plans,
      });

    } catch (error) {
      next(error);
    }
  };

export const getPlanByIdController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const plan =
        await getPlanById(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: plan,
      });

    } catch (error) {
      next(error);
    }
  };

export const updatePlanController =
  async (
    req,
    res,
    next
  ) => {
    try {

      const plan =
        await updatePlan(
          req.params.id,
          req.body
        );

      res.status(200).json({
        success: true,
        message:
          "Plan updated successfully",
        data: plan,
      });

    } catch (error) {
      next(error);
    }
  };

export const deletePlanController =
  async (
    req,
    res,
    next
  ) => {
    try {

      await deletePlan(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Plan deleted successfully",
      });

    } catch (error) {
      next(error);
    }
  };