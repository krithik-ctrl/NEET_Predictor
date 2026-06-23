import {
  createCourse,
  getCourses,
  getCourseById,
} from "./course.service.js";

export const createCourseController = async (
  req,
  res,
  next
) => {
  try {
    const course = await createCourse(req.body);
const existingCourse = await Course.findOne({
  name: payload.name,
});

if (existingCourse) {
  throw new Error("Course already exists");
}
    res.status(201).json({
      success: true,
      message: "Course created successfully",
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
    const courses = await getCourses();

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
    const course = await getCourseById(req.params.id);

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};