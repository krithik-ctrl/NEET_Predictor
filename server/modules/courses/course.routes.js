import { Router } from "express";

import {
  createCourseController,
  getCoursesController,
  getCourseByIdController,
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

export default router;