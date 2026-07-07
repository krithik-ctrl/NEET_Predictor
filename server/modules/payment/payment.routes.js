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
  authenticate,
  authorize(
    "admin"
  ),
  getPaymentByIdController
);

router.patch(
  "/:id/status",
  authenticate,
  authorize(
    "admin"
  ),
  updatePaymentStatusController
);

router.post(
  "/verify",
  authenticate,
  authorize(
    "student"
  ),
  verifyPaymentController
);

export default router;