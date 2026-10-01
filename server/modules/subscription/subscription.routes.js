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
import { bulkDeleteHandler } from "../../common/utils/bulkDelete.js";
import { bulkDeleteSubscriptions } from "./subscription.service.js";
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

// ADMIN_V2 — bulk delete (max 100) — see API_CHANGES_V2.md
router.post(
  "/bulk-delete",
  authenticateAdmin,
  requirePermission("subscriptions.delete"),
  bulkDeleteHandler(bulkDeleteSubscriptions, { action: "subscription_bulk_delete" })
);

export default router;