import { Router } from "express";

import {
  authenticate,
} from "../../auth/middleware/authenticate.js";

import {
  createPaymentController,
  getMyPaymentsController,
  getAllPaymentsController,
  getPaymentByIdController,
  updatePaymentStatusController,
    verifyPaymentController,
} from "./payment.controller.js";
import { authenticateAdmin } from "../../auth/middleware/authenticateAdmin.js";

import { requirePermission } from "../../auth/middleware/requirePermission.js";

const router =
  Router();

router.post(
  "/",
  authenticate,
  
  createPaymentController
);

router.get(
  "/my-payments",
  authenticate,
  getMyPaymentsController
);

router.get(
  "/",
  authenticateAdmin,
  requirePermission("payments.read"),
  getAllPaymentsController
);

router.get(
  "/:id",
  authenticateAdmin,
  requirePermission("payments.read"),
  getPaymentByIdController
);

router.patch(
  "/:id/status",
  authenticateAdmin,
  requirePermission("payments.update_status"),
  updatePaymentStatusController
);

router.post(
  "/verify",
  authenticate,
 
  verifyPaymentController
);

export default router;