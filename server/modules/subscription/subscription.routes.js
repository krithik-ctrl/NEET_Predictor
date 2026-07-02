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

import {
  authorizeAdmin,
} from "../../auth/middleware/authorizeAdmin.js";
const router =
  Router();

router.post(
  "/",
  authenticateAdmin,
  authorizeAdmin("admin"),
  createSubscriptionController
);

router.get(
  "/",
  authenticateAdmin,
 authorizeAdmin("admin"),
  getSubscriptionsController
);

router.get(
  "/:id",
  authenticateAdmin,
  authorizeAdmin("admin"),
  getSubscriptionByIdController
);

router.patch(
  "/:id",
  authenticateAdmin,
  authorizeAdmin("admin"),
  updateSubscriptionController
);

router.delete(
  "/:id",
  authenticateAdmin,
  authorizeAdmin("admin"),
  deleteSubscriptionController
);

export default router;