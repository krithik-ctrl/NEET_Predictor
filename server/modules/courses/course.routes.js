import { Router } from "express";

import {
  createCourseController,
  getCoursesController,
  getCourseByIdController,
} from "./course.controller.js";

const router = Router();

router.post("/", createCourseController);

router.get("/", getCoursesController);

router.get("/:id", getCourseByIdController);

export default router;