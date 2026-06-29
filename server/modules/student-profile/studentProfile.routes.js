import express from "express";


import {
  getStudentProfileController,
  upsertStudentProfileController,
} from "./studentProfile.controller.js";

import {
  authenticate,
} from "../../auth/middleware/authenticate.js"

import {
  authorize,
} from "../../auth/middleware/authorize.js";

const router =
  express.Router();

router.get(
  "/",
  authenticate,
  authorize(
    "student",
    "admin"
  ),
  getStudentProfileController
);

router.put(
  "/",
  authenticate,
  authorize(
    "student"
  ),
  upsertStudentProfileController
);

export default router;