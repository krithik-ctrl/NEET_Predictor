import express from "express";

import {
  createCollegeController,
  getCollegesController,
  getCollegeByIdController,
  updateCollegeController,
deleteCollegeController
} from "./college.controller.js";

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
  createCollegeController
);

router.get(
  "/",
  getCollegesController
);

router.get(
  "/:id",
  getCollegeByIdController
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  updateCollegeController
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteCollegeController
);

export default router;