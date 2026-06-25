import mongoose from "mongoose";

const savedCollegeSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

savedCollegeSchema.index(
  {
    userId: 1,
    collegeId: 1,
  },
  {
    unique: true,
  }
);

export const SavedCollege =
  mongoose.model(
    "SavedCollege",
    savedCollegeSchema
  );