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
    // PG specialization (branch). null for MBBS/BDS rows.
    specializationShort: {
      type: String,
      trim: true,
      default: null,
    },
    specializationFull: {
      type: String,
      trim: true,
      default: null,
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
        "Round 5",
        "Round 6",
        "Round 7",
        "Round 8",
        "Round 9",
        "Round 10",
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

    // ── Excel display fields (stamped per row from the sheet / college) ──
    // Fee → seatType-scoped fee (AIQ fee now; management/NRI fee later)
    fees: {
      type: Number,
      default: null,
      min: 0,
    },

    seats: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Beds
    beds: {
      type: Number,
      default: null,
      min: 0,
    },

    // Bond Years
    bondYears: {
      type: Number,
      default: null,
      min: 0,
    },

    // Bond Penalty
    bondPenalty: {
      type: Number,
      default: null,
      min: 0,
    },

    // Stipend (Internship)
    stipend: {
      type: Number,
      default: null,
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
| Compound Index (includes provider so client + internal can coexist)
|--------------------------------------------------------------------------
*/

cutoffSchema.index(
  {
    collegeId: 1,
    courseId: 1,
    specializationShort: 1,   // ADDED — MD/MS branches distinct
    year: 1,
    counsellingType: 1,
    state: 1,
    seatType: 1,
    category: 1,
    round: 1,
    provider: 1,
  },
  { unique: true }
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