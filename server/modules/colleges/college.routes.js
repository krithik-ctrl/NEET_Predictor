import express from "express";

import {
  createCollegeController,
  getCollegesController,
  getCollegeByIdController,
  updateCollegeController,
deleteCollegeController,
getCollegeFilterOptionsController,
} from "./college.controller.js";

import {
  authenticate,
} from "../../auth/middleware/authenticate.js";

import { authenticateAdmin } from "../../auth/middleware/authenticateAdmin.js";
import { requirePermission } from "../../auth/middleware/requirePermission.js";
const router =
  express.Router();

router.post(
  "/",
  authenticateAdmin,
  requirePermission("colleges.create"),
  createCollegeController
);

router.get(
  "/",
  getCollegesController
);
router.get("/filter-options", getCollegeFilterOptionsController);
router.get(
  "/:id",
  getCollegeByIdController
);

router.patch(
  "/:id",
  authenticateAdmin,
  requirePermission("colleges.update"),
  updateCollegeController
);

router.delete(
  "/:id",
  authenticateAdmin,
  requirePermission("colleges.delete"),
  deleteCollegeController
);

export default router;