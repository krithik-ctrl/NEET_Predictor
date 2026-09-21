import { Router } from "express";

import {
  createSubscriptionController,
  getSubscriptionsController,
  getSubscriptionByIdController,
  updateSubscriptionController,
  deleteSubscriptionController,
} from "./subscription.controller.js";

import {
  authenticateAdmin,
} from "../../auth/middleware/authenticateAdmin.js";

import { requirePermission } from "../../auth/middleware/requirePermission.js";
const router =
  Router();

router.post(
  "/",
  authenticateAdmin,
  requirePermission("subscriptions.create"),
  createSubscriptionController
);

router.get(
  "/",
  authenticateAdmin,
  requirePermission("subscriptions.read"),
  getSubscriptionsController
);

router.get(
  "/:id",
  authenticateAdmin,
  requirePermission("subscriptions.read"),
  getSubscriptionByIdController
);

router.patch(
  "/:id",
  authenticateAdmin,
  requirePermission("subscriptions.update"),
  updateSubscriptionController
);

router.delete(
  "/:id",
  authenticateAdmin,
  requirePermission("subscriptions.delete"),
  deleteSubscriptionController
);

export default router;