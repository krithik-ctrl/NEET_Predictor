import mongoose from "mongoose";

const cutoffSchema = new mongoose.Schema(
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

    quota: {
      type: String,
      required: true,
      trim: true,
    },

    seatType: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
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
      min: 0,
    },

    seats: {
      type: Number,
      default: 0,
      min: 0,
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

/*
|--------------------------------------------------------------------------
| Compound Index
|--------------------------------------------------------------------------
*/

cutoffSchema.index(
  {
    collegeId: 1,
    courseId: 1,
    year: 1,
    quota: 1,
    seatType: 1,
    category: 1,
    round: 1,
  },
  {
    unique: true,
  }
);

/*
|--------------------------------------------------------------------------
| Search Indexes
|--------------------------------------------------------------------------
*/

cutoffSchema.index({
  courseId: 1,
  quota: 1,
  seatType: 1,
  category: 1,
  year: 1,
});

cutoffSchema.index({
  collegeId: 1,
});

export const Cutoff = mongoose.model(
  "Cutoff",
  cutoffSchema
);