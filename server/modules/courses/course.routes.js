import { Router } from "express";

import {
  createCourseController,
  getCoursesController,
  getCourseByIdController,
  updateCourseController,
  deleteCourseController,
} from "./course.controller.js";

import { authenticateAdmin } from "../../auth/middleware/authenticateAdmin.js";

import { requirePermission } from "../../auth/middleware/requirePermission.js";
const router = Router();

router.post("/",
  authenticateAdmin,
  requirePermission("courses.create")
  ,createCourseController);

router.get("/", getCoursesController);

router.get("/:id", getCourseByIdController);

router.patch(
  "/:id",
  authenticateAdmin,
  requirePermission("courses.update"),
  updateCourseController
);

router.delete(
  "/:id",
  authenticateAdmin,
  requirePermission("courses.delete"),
  deleteCourseController
);

export default router;