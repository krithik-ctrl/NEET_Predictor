import mongoose from "mongoose";

import { College } from "./college.model.js";
import { Course } from "../courses/course.model.js";

export const createCollege =
  async (payload) => {

    const existingCollege =
      await College.findOne({
          shortName: payload.shortName,
  collegeType: payload.collegeType,
      });

    if (existingCollege) {
      throw new Error(
        "College already exists"
      );
    }

    for (const courseId of payload.courses) {

      if (
        !mongoose.Types.ObjectId.isValid(
          courseId
        )
      ) {
        throw new Error(
          "Invalid course ID"
        );
      }

      const course =
        await Course.findById(
          courseId
        );

      if (!course) {
        throw new Error(
          "Course not found"
        );
      }
    }

    return await College.create(
      payload
    );
  };

export const getColleges = async (query) => {
  const { search, state, ownership, courseIds, page = 1, limit = 20 } = query;

  const filters = { status: "active" };

  if (state) filters.state = state;
  if (ownership) filters.ownership = ownership;

  // Stream filter: match colleges offering ANY of the given courses.
  // courseIds arrives as a comma-separated string (e.g. one stream = "id1,id2").
  if (courseIds) {
    const ids = String(courseIds)
      .split(",")
      .map((s) => s.trim())
      .filter((s) => mongoose.Types.ObjectId.isValid(s))
      .map((s) => new mongoose.Types.ObjectId(s));
    if (ids.length) filters.courses = { $in: ids };
  }

  if (search) {
    filters.$or = [
      { name: { $regex: search, $options: "i" } },
      { shortName: { $regex: search, $options: "i" } },
      { city: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [colleges, total] = await Promise.all([
    College.find(filters).populate("courses").sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    College.countDocuments(filters),
  ]);

  return {
    colleges,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
};

export const getCollegeById =
  async (id) => {

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      throw new Error(
        "Invalid college ID"
      );
    }

    const college =
      await College.findById(id)
        .populate("courses");

    if (!college) {
      throw new Error(
        "College not found"
      );
    }

    return college;
  };

export const updateCollege =
  async (
    collegeId,
    payload
  ) => {

    const college =
      await College.findById(
        collegeId
      );

    if (!college) {
      throw new Error(
        "College not found"
      );
    }

    // Duplicate guard on identity (shortName + collegeType) if either changes
    if (payload.shortName || payload.collegeType) {
      const shortName = payload.shortName ?? college.shortName;
      const collegeType = payload.collegeType ?? college.collegeType;
      const dup = await College.findOne({
        shortName, collegeType, _id: { $ne: collegeId },
      });
      if (dup) throw new Error("College already exists");
    }

    if (payload.courses) {

      for (const courseId of payload.courses) {

        if (
          !mongoose.Types.ObjectId.isValid(
            courseId
          )
        ) {
          throw new Error(
            "Invalid course ID"
          );
        }

        const course =
          await Course.findById(
            courseId
          );

        if (!course) {
          throw new Error(
            "Course not found"
          );
        }
      }
    }

    return await College.findByIdAndUpdate(
      collegeId,
      payload,
      {
        new: true,
      }
    ).populate("courses");
  };

  export const deleteCollege =
  async (collegeId) => {

    const college =
      await College.findById(
        collegeId
      );

    if (!college) {
      throw new Error(
        "College not found"
      );
    }

    return await College.findByIdAndUpdate(
      collegeId,
      {
        status: "inactive",
      },
      {
        new: true,
      }
    );
  };


 export const getCollegeFilterOptions = async () => {
  const [states, ownerships] = await Promise.all([
    College.distinct("state", { status: "active" }),
    College.distinct("ownership", { status: "active" }),
  ]);

  // Drop placeholder / invalid values from the dropdowns; keep every real one.
  const isReal = (v) => {
    if (!v) return false;
    const s = String(v).trim().toLowerCase();
    return s !== "" && s !== "data required" && s !== "-";
  };

  return {
    states: states.filter(isReal).sort(),
    ownerships: ownerships.filter(isReal).sort(),
  };
};