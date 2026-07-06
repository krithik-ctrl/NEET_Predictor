import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    description: {
      type: String,
      default: "",
    },
        level: {
      type: String,
      enum: ["UG", "PG"],
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model("Course", courseSchema);