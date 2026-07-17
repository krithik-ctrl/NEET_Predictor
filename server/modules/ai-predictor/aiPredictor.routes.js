import { Router } from "express";

import { authenticate } from "../../auth/middleware/authenticate.js";

import { aiPredictor } from "./aiPredictor.controller.js";

const router = Router();

router.post(
  "/",
  authenticate,
  aiPredictor
);

export default router;