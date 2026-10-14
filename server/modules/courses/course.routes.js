import { Router } from "express";

import {
  createCourseController,
  getCoursesController,
  getCourseByIdController,
  getAdminCoursesController,
  updateCourseController,
  deleteCourseController,
} from "./course.controller.js";

import { authenticateAdmin } from "../../auth/middleware/authenticateAdmin.js";

import { requirePermission } from "../../auth/middleware/requirePermission.js";
import { bulkDeleteHandler } from "../../common/utils/bulkDelete.js";
import { bulkDeleteCourses } from "./course.service.js";
const router = Router();

router.post("/",
  authenticateAdmin,
  requirePermission("courses.create")
  ,createCourseController);

router.get("/", getCoursesController);

// Admin list (all statuses). Must stay above "/:id" so "admin" isn't read as an id.
router.get(
  "/admin",
  authenticateAdmin,
  requirePermission("courses.read"),
  getAdminCoursesController
);

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

// ADMIN_V2 — bulk delete (max 100) — see API_CHANGES_V2.md
router.post(
  "/bulk-delete",
  authenticateAdmin,
  requirePermission("courses.delete"),
  bulkDeleteHandler(bulkDeleteCourses, { action: "course_bulk_delete" })
);

export default router;