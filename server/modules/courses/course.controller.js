import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "./course.service.js";

import {
  updateCourseSchema,
  adminCourseListQuerySchema,
} from "./course.validation.js";

const firstIssue = (error) =>
  error.issues?.[0]?.message || "Invalid request";

export const createCourseController = async (
  req,
  res,
  next
) => {
  try {
    const course = await createCourse(
      req.body
    );

    res.status(201).json({
      success: true,
      message:
        "Course created successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

export const getCoursesController = async (
  req,
  res,
  next
) => {
  try {
    const courses =
      await getCourses();

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

// Admin list — all courses with their status, so disabled ones can be re-enabled.
export const getAdminCoursesController = async (req, res, next) => {
  try {
    const parsed = adminCourseListQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: firstIssue(parsed.error),
      });
    }

    const courses = await getCourses({ status: parsed.data.status });

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

export const getCourseByIdController = async (
  req,
  res,
  next
) => {
  try {
    const course =
      await getCourseById(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCourseController = async (req, res, next) => {
  try {
    const parsed = updateCourseSchema.safeParse(req.body ?? {});
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: firstIssue(parsed.error),
      });
    }

    const course = await updateCourse(req.params.id, parsed.data);
    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourseController = async (req, res, next) => {
  try {
    await deleteCourse(req.params.id);
    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};