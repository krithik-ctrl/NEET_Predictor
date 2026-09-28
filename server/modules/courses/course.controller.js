import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "./course.service.js";

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
    const course = await updateCourse(req.params.id, req.body);
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