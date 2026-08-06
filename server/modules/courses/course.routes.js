import { Router } from "express";

import {
  createCourseController,
  getCoursesController,
  getCourseByIdController,
} from "./course.controller.js";

import { authenticateAdmin } from "../../auth/middleware/authenticateAdmin.js";

import { authorizeAdmin } from "../../auth/middleware/authorizeAdmin.js";
const router = Router();

router.post("/", 
  authenticateAdmin,
  authorizeAdmin("admin")
  ,createCourseController);

router.get("/", getCoursesController);

router.get("/:id", getCourseByIdController);

export default router;