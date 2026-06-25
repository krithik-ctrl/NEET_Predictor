import { Router } from "express";

import { authenticate } from "../../auth/middleware/authenticate.js";

import {
  saveCollegeController,
  removeSavedCollegeController,
  getSavedCollegesController,
} from "./savedCollege.controller.js";

const router = Router();

router.post(
  "/:collegeId",
  authenticate,
  saveCollegeController
);

router.delete(
  "/:collegeId",
  authenticate,
  removeSavedCollegeController
);

router.get(
  "/",
  authenticate,
  getSavedCollegesController
);



export default router;