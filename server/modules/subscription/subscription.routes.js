import { Router } from "express";

import {
  createSubscriptionController,
  getSubscriptionsController,
  getSubscriptionByIdController,
  updateSubscriptionController,
  deleteSubscriptionController,
} from "./subscription.controller.js";

import {
  authenticate,
} from "../../auth/middleware/authenticate.js";

import {
  authorize,
} from "../../auth/middleware/authorize.js";

const router =
  Router();

router.post(
  "/",
  authenticate,
  authorize("admin"),
  createSubscriptionController
);

router.get(
  "/",
  authenticate,
  authorize("admin"),
  getSubscriptionsController
);

router.get(
  "/:id",
  authenticate,
  authorize("admin"),
  getSubscriptionByIdController
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  updateSubscriptionController
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteSubscriptionController
);

export default router;