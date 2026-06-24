import mongoose from "mongoose";

const cutoffSchema =
  new mongoose.Schema(
    {
      collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true,
      },

      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },

      year: {
        type: Number,
        required: true,
      },

      category: {
        type: String,
        enum: [
          "General",
          "OBC",
          "SC",
          "ST",
          "EWS",
        ],
        required: true,
      },

      quota: {
        type: String,
        enum: [
          "AIQ",
          "State",
          "Management",
        ],
        required: true,
      },

      round: {
        type: String,
        enum: [
          "Round 1",
          "Round 2",
          "Round 3",
          "Mop-Up",
          "Stray Vacancy",
        ],
        required: true,
      },

      openingRank: {
        type: Number,
        required: true,
      },

      closingRank: {
        type: Number,
        required: true,
      },

      fees: {
        type: Number,
        default: 0,
      },

      seats: {
        type: Number,
        default: 0,
      },

      seatType: {
        type: String,
        enum: [
          "Government",
          "Management",
          "NRI",
        ],
        default: "Government",
      },

      status: {
        type: String,
        enum: [
          "active",
          "inactive",
        ],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

cutoffSchema.index(
  {
    collegeId: 1,
    courseId: 1,
    year: 1,
    category: 1,
    quota: 1,
    round: 1,
    seatType: 1,
  },
  {
    unique: true,
  }
);

export const Cutoff =
  mongoose.model(
    "Cutoff",
    cutoffSchema
  );