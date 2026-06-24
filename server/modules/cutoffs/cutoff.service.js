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

export const getCutoffs =
  async () => {
    return await Cutoff.find({
      status: "active",
    })
      .populate(
        "collegeId"
      )
      .populate(
        "courseId"
      )
      .sort({
        year: -1,
        createdAt: -1,
      });
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