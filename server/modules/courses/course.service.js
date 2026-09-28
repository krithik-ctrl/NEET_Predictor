import { Course } from "./course.model.js";

export const createCourse = async (
  payload
) => {
  const existingCourse =
    await Course.findOne({
      name: payload.name,
    });

  if (existingCourse) {
    throw new Error(
      "Course already exists"
    );
  }

  const course = await Course.create(
    payload
  );

  return course;
};

export const getCourses = async () => {
  return await Course.find({status: "active"})
    .sort({
      createdAt: -1,
    })
    .lean(); // read-only list view — skip Mongoose document overhead
};

export const getCourseById = async (
  id
) => {
  return await Course.findById(id);
};

export const updateCourse = async (id, payload) => {
  const course = await Course.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    throw new Error("Course not found");
  }
  return course;
};

export const deleteCourse = async (id) => {
  const course = await Course.findByIdAndUpdate(
    id,
    { status: "inactive" },
    { new: true }
  );
  if (!course) {
    throw new Error("Course not found");
  }
  return course;
};