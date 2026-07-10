import mongoose from "mongoose";

import { College } from "./college.model.js";
import { Course } from "../courses/course.model.js";

export const createCollege =
  async (payload) => {

    const existingCollege =
      await College.findOne({
        name: payload.name,
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

export const getColleges =
  async (query) => {

    const {

      search,

      state,

      collegeType,

      page = 1,

      limit = 20,

    } = query;

    const filters = {
      status: "active",
    };

    if (state) {
      filters.state = state;
    }

    if (collegeType) {
      filters.collegeType =
        collegeType;
    }

    if (search) {

      filters.$or = [

        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          shortName: {
            $regex: search,
            $options: "i",
          },
        },

      ];

    }

    const skip =
      (Number(page) - 1) *
      Number(limit);

    const [

      colleges,

      total,

    ] = await Promise.all([

      College.find(filters)
        .populate("courses")
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(Number(limit)),

      College.countDocuments(
        filters
      ),

    ]);

    return {

      colleges,

      pagination: {

        page:
          Number(page),

        limit:
          Number(limit),

        total,

        totalPages:
          Math.ceil(
            total /
              Number(limit)
          ),

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

    if (payload.name) {
      const existingCollege =
        await College.findOne({
          name: payload.name,
          _id: {
            $ne: collegeId,
          },
        });

      if (existingCollege) {
        throw new Error(
          "College already exists"
        );
      }
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