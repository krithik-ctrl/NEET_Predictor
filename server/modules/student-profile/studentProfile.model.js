import mongoose from "mongoose";

const studentProfileSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      rank: {
        type: Number,
        default: null,
      },

      score: {
        type: Number,
        default: null,
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
        default: "General",
      },

      quota: {
        type: String,
        enum: [
          "AIQ",
          "State",
          "Management",
        ],
        default: "AIQ",
      },

      gender: {
        type: String,
        enum: [
          "Male",
          "Female",
          "Other",
        ],
      },

      pwdStatus: {
        type: Boolean,
        default: false,
      },

      state: {
        type: String,
      },

      domicileState: {
        type: String,
      },

      budget: {
        type: Number,
        default: null,
      },

      preferredCourse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },

      profileCompleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

export const StudentProfile =
  mongoose.model(
    "StudentProfile",
    studentProfileSchema
  );