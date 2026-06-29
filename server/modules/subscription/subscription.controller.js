import {
  createSubscription,
  getSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
} from "./subscription.service.js";

import {
  createSubscriptionSchema,
  updateSubscriptionSchema,
} from "./subscription.validation.js";

export const createSubscriptionController =
  async (req, res, next) => {
    try {

      const validatedData =
        createSubscriptionSchema.parse(
          req.body
        );

      const subscription =
        await createSubscription(
          validatedData
        );

      res.status(201).json({
        success: true,
        message:
          "Subscription created successfully",
        data: subscription,
      });

    } catch (error) {
      next(error);
    }
  };

export const getSubscriptionsController =
  async (req, res, next) => {
    try {

      const subscriptions =
        await getSubscriptions();

      res.status(200).json({
        success: true,
        data: subscriptions,
      });

    } catch (error) {
      next(error);
    }
  };

export const getSubscriptionByIdController =
  async (req, res, next) => {
    try {

      const subscription =
        await getSubscriptionById(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: subscription,
      });

    } catch (error) {
      next(error);
    }
  };

export const updateSubscriptionController =
  async (req, res, next) => {
    try {

      const validatedData =
        updateSubscriptionSchema.parse(
          req.body
        );

      const subscription =
        await updateSubscription(
          req.params.id,
          validatedData
        );

      res.status(200).json({
        success: true,
        message:
          "Subscription updated successfully",
        data: subscription,
      });

    } catch (error) {
      next(error);
    }
  };

export const deleteSubscriptionController =
  async (req, res, next) => {
    try {

      await deleteSubscription(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "Subscription deleted successfully",
      });

    } catch (error) {
      next(error);
    }
  };