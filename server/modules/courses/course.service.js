import { Course } from "./course.model.js";
import { markNotFound } from "../../common/utils/bulkDelete.js";

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

/*
|--------------------------------------------------------------------------
| ADMIN_V2 — Bulk delete. Mirrors the single DELETE /courses/:id, which is
| a SOFT delete (status → "inactive"): courses are referenced by colleges,
| cutoffs, student profiles and predictions, and no hard delete was asked
| for. Already-inactive courses are reported as "not_found".
|--------------------------------------------------------------------------
*/

export const bulkDeleteCourses =
  async (ids, skipped) => {

    const found =
      ids.length
        ? await Course.find(
            { _id: { $in: ids }, status: { $ne: "inactive" } },
            { _id: 1 }
          ).lean()
        : [];

    const foundIds = found.map((doc) => doc._id);

    markNotFound(ids, foundIds, skipped);

    const result =
      foundIds.length
        ? await Course.updateMany(
            { _id: { $in: foundIds } },
            { $set: { status: "inactive" } }
          )
        : { modifiedCount: 0 };

    return {
      deletedCount: result.modifiedCount,
      foundIds,
      mode: "soft",
    };

  };
