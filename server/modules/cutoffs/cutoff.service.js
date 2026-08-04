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
   status,
    sortBy = "year",
    sortOrder = "desc",
  } = query;
console.log(query)
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



export const getCutoffTrends = async (query) => {
  const { collegeId, courseId, counsellingType, year } = query;
  if (!collegeId) throw new Error("collegeId is required");

  const match = { collegeId: new mongoose.Types.ObjectId(collegeId) };
  if (courseId) match.courseId = new mongoose.Types.ObjectId(courseId);
  if (counsellingType) match.counsellingType = counsellingType;
  if (year) match.year = Number(year);

  // Collapse thousands of rows -> one per (round × category × seatType × counselling × year)
  const rows = await Cutoff.aggregate([
    { $match: match },
    {
      $group: {
        _id: {
          round: "$round",
          category: "$category",
          seatType: "$seatType",
          counsellingType: "$counsellingType",
          year: "$year",
        },
        openingRank: { $min: "$openingRank" },
        closingRank: { $max: "$closingRank" },
        seats: { $max: "$seats" }, // $max avoids over-counting re-offered seats across rounds
        records: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        round: "$_id.round",
        category: "$_id.category",
        seatType: "$_id.seatType",
        counsellingType: "$_id.counsellingType",
        year: "$_id.year",
        openingRank: 1,
        closingRank: 1,
        seats: 1,
        records: 1,
      },
    },
    { $sort: { closingRank: 1 } },
  ]);

  // Courses that actually have cutoff data for this college (for the course pills)
  const courses = await Cutoff.aggregate([
    { $match: { collegeId: new mongoose.Types.ObjectId(collegeId) } },
    { $group: { _id: "$courseId" } },
    { $lookup: { from: "courses", localField: "_id", foreignField: "_id", as: "course" } },
    { $unwind: "$course" },
    { $project: { _id: 0, id: "$course._id", name: "$course.name", level: "$course.level" } },
    { $sort: { name: 1 } },
  ]);

  const distinct = (key) =>
    [...new Set(rows.map((r) => r[key]).filter((v) => v !== null && v !== undefined))];

  return {
    filters: {
      courses,
      counsellingTypes: distinct("counsellingType"),
      years: distinct("year").sort((a, b) => b - a),
      seatTypes: distinct("seatType"),
      rounds: distinct("round").sort(), // "Round 1", "Round 2", ...
      categories: distinct("category"),
    },
    data: rows,
  };
};