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
} from "./payment.controller.js";

const router =
  Router();

router.post(
  "/",
  authenticate,
  authorize(
    "student"
  ),
  createPaymentController
);

router.get(
  "/my-payments",
  authenticate,
  authorize(
    "student"
  ),
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

export default router;