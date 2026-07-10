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
  authorizeAdmin,
} from "../../auth/middleware/authorizeAdmin.js";
import { authenticateAdmin } from "../../auth/middleware/authenticateAdmin.js";
const router =
  express.Router();

router.post(
  "/",
  authenticateAdmin,
  authorizeAdmin("admin"),
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
  authenticateAdmin,
  authorizeAdmin("admin"),
  updateCollegeController
);

router.delete(
  "/:id",
  authenticateAdmin,
  authorizeAdmin("admin"),
  deleteCollegeController
);

export default router;