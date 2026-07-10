import { Router } from "express";

import {
  authenticate,
} from "../../auth/middleware/authenticate.js";

import {
  authorize,
} from "../../auth/middleware/authorize.js";

import {
  createPaymentController,
  getMyPaymentsController,
  getAllPaymentsController,
  getPaymentByIdController,
  updatePaymentStatusController,
    verifyPaymentController,
} from "./payment.controller.js";
import { authenticateAdmin } from "../../auth/middleware/authenticateAdmin.js";

import { authorizeAdmin } from "../../auth/middleware/authorizeAdmin.js";

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
  authenticate,
  authorize(
    "admin"
  ),
  getAllPaymentsController
);

router.get(
  "/:id",
  authenticateAdmin,
  authorizeAdmin(
    "admin"
  ),
  getPaymentByIdController
);

router.patch(
  "/:id/status",
  authenticateAdmin,
  authorizeAdmin(
    "admin"
  ),
  updatePaymentStatusController
);

router.post(
  "/verify",
  authenticate,
 
  verifyPaymentController
);

export default router;