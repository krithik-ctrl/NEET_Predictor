import express from "express";

import {
  predictCollegesController,
} from "./predictor.controller.js";

import {
  authenticate,
} from "../../auth/middleware/authenticate.js";

const router =
  express.Router();

router.get(
  "/",
  authenticate,
  predictCollegesController
);

export default router;