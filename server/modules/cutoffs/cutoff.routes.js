import express from "express";

import {
  createCutoffController,
  getCutoffsController,
  getCutoffByIdController,
  updateCutoffController,
  deleteCutoffController,
} from "./cutoff.controller.js";

import {
  authenticate,
} from "../../auth/middleware/authenticate.js";

import {
  authorize,
} from "../../auth/middleware/authorize.js";

const router =
  express.Router();

router.post(
  "/",
  authenticate,
  authorize("admin"),
  createCutoffController
);

router.get(
  "/",
  getCutoffsController
);

router.get(
  "/:id",
  getCutoffByIdController
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  updateCutoffController
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteCutoffController
);

export default router;