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

    counsellingType: {
      type: String,
      enum: ["AIQ", "STATE"],
    },

    state: {
      type: String,
      trim: true,
      default: "",
    },

    collegeType: {
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
        "Round 3 (Mop-up)",
        "Round 4 (Stray Round)",
        "NRI Quota",
        "Minority Quota",
      ],
      default: null,
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
      enum: ["active", "inactive"],
      default: "active",
    },

    // Confidence of the value (unchanged)
    dataSource: {
      type: String,
      enum: ["sourced", "estimated"],
      default: "sourced",
    },

    // Funnel layer: which provider owns this row. Client seed rows use "client".
    provider: {
      type: String,
      default: "internal",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/*
|--------------------------------------------------------------------------
| Compound Index (now includes provider so client + internal can coexist)
|--------------------------------------------------------------------------
*/

cutoffSchema.index(
  {
    collegeId: 1,
    courseId: 1,
    year: 1,
    counsellingType: 1,
    state: 1,
    seatType: 1,
    category: 1,
    round: 1,
    provider: 1,
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
  year: -1,
  counsellingType: 1,
  state: 1,
  seatType: 1,
  category: 1,
  closingRank: 1,
});

cutoffSchema.index({
  collegeId: 1,
});

export const Cutoff = mongoose.model("Cutoff", cutoffSchema);