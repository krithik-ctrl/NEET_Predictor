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

      city: {
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