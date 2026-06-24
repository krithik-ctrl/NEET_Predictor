import mongoose from "mongoose";

const collegeSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      ownership: {
        type: String,
        enum: [
          "Government",
          "Private",
          "Deemed",
        ],
        required: true,
      },

      collegeType: {
        type: String,
        enum: [
          "Medical",
          "Dental",
          "Ayush",
        ],
        required: true,
      },

      courses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
      ],

      website: {
        type: String,
        default: "",
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

export const College =
  mongoose.model(
    "College",
    collegeSchema
  );