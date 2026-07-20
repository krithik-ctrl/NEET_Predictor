import mongoose from "mongoose";

import { Cutoff } from "./cutoff.model.js";
import { College } from "../colleges/college.model.js";
import { Course } from "../courses/course.model.js";

export const createCutoff =
  async (payload) => {

    if (
      !mongoose.Types.ObjectId.isValid(
        payload.collegeId
      )
    ) {
      throw new Error(
        "Invalid college ID"
      );
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        payload.courseId
      )
    ) {
      throw new Error(
        "Invalid course ID"
      );
    }

    const college =
      await College.findById(
        payload.collegeId
      );

    if (!college) {
      throw new Error(
        "College not found"
      );
    }

    const course =
      await Course.findById(
        payload.courseId
      );

    if (!course) {
      throw new Error(
        "Course not found"
      );
    }

    const existingCutoff =
      await Cutoff.findOne({
        collegeId:
          payload.collegeId,
        courseId:
          payload.courseId,
        year: payload.year,
        category:
          payload.category,
        quota:
          payload.quota,
        round:
          payload.round,
        seatType:
          payload.seatType ||
          "Government",
      });

    if (existingCutoff) {
      throw new Error(
        "Cutoff already exists"
      );
    }

    return await Cutoff.create(
      payload
    );
  };

// Replace the existing getCutoffs export in cutoff.service.js with this version.

export const getCutoffs = async (query = {}) => {
  const {
    page = 1,
    limit = 20,
    year,
    collegeId,
    courseId,
    counsellingType,
    state,
    category,
    seatType,
    round,
    status = "active",
    sortBy = "year",
    sortOrder = "desc",
  } = query;

  const pageNum = Math.max(Number(page) || 1, 1);
  const limitNum = Math.min(Math.max(Number(limit) || 20, 1), 100); // hard cap to avoid abuse
  const skip = (pageNum - 1) * limitNum;

  const filter = {};
  if (status) filter.status = status;
  if (year) filter.year = Number(year);
  if (counsellingType) filter.counsellingType = counsellingType;
  if (state) filter.state = state;
  if (category) filter.category = category;
  if (seatType) filter.seatType = seatType;
  if (round) filter.round = round;

  if (collegeId) {
    if (!mongoose.Types.ObjectId.isValid(collegeId)) {
      throw new Error("Invalid college ID");
    }
    filter.collegeId = collegeId;
  }

  if (courseId) {
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      throw new Error("Invalid course ID");
    }
    filter.courseId = courseId;
  }

  const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1, createdAt: -1 };

  const [data, total] = await Promise.all([
    Cutoff.find(filter)
      .populate("collegeId", "name city state") // trim populated fields — don't pull full docs at 10k+ scale
      .populate("courseId", "name")
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean(), // read-only list view — skip Mongoose document overhead
    Cutoff.countDocuments(filter),
  ]);

  return {
    data,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      hasNextPage: skip + data.length < total,
      hasPrevPage: pageNum > 1,
    },
  };
};

export const getCutoffById =
  async (id) => {

    if (
      !mongoose.Types.ObjectId.isValid(
        id
      )
    ) {
      throw new Error(
        "Invalid cutoff ID"
      );
    }

    const cutoff =
      await Cutoff.findById(id)
        .populate(
          "collegeId"
        )
        .populate(
          "courseId"
        );

    if (!cutoff) {
      throw new Error(
        "Cutoff not found"
      );
    }

    return cutoff;
  };

export const updateCutoff =
  async (
    cutoffId,
    payload
  ) => {

    if (
      !mongoose.Types.ObjectId.isValid(
        cutoffId
      )
    ) {
      throw new Error(
        "Invalid cutoff ID"
      );
    }

    const cutoff =
      await Cutoff.findById(
        cutoffId
      );

    if (!cutoff) {
      throw new Error(
        "Cutoff not found"
      );
    }

    return await Cutoff.findByIdAndUpdate(
      cutoffId,
      payload,
      {
        new: true,
      }
    )
      .populate(
        "collegeId"
      )
      .populate(
        "courseId"
      );
  };

export const deleteCutoff =
  async (cutoffId) => {

    if (
      !mongoose.Types.ObjectId.isValid(
        cutoffId
      )
    ) {
      throw new Error(
        "Invalid cutoff ID"
      );
    }

    const cutoff =
      await Cutoff.findById(
        cutoffId
      );

    if (!cutoff) {
      throw new Error(
        "Cutoff not found"
      );
    }

    return await Cutoff.findByIdAndUpdate(
      cutoffId,
      {
        status: "inactive",
      },
      {
        new: true,
      }
    );
  };