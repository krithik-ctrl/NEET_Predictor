import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      // NOT unique — same institution can exist as Medical and Dental rows
    },
    shortName: {
      type: String,
      required: true,   // scrapper's match key
      trim: true,
    },

    collegeType: {
      type: String,
      enum: ["Medical", "Dental", "Ayurveda", "Homeopathy", "Unani", "Other"],
      required: true,
    },

    // location
    state: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      default: "",   // "" → UI shows NA
    },

    ownership: {
      type: String,
      enum: [
        "Government",
        "AIIMS",
        "Central",
        "ESIC",
        "Municipal",
        "Private",
        "Deemed",
        "Government Aided",
        "Other",
      ],
      required: true,
    },

    estbYear:    { type: Number, default: null },   // null → NA
    recognition: { type: String, trim: true, default: "" },
    affiliation: { type: String, trim: true, default: "" },
    website:     { type: String, trim: true, default: "" },

    // 2025 display attributes (from Sheet2). null = unknown → UI shows NA.
    fees:        { type: Number, default: null, min: 0 },
    beds:        { type: Number, default: null, min: 0 },
    bondYears:   { type: Number, default: null, min: 0 },
    bondPenalty: { type: Number, default: null, min: 0 },
    stipend:     { type: Number, default: null, min: 0 },

    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    status: {
      type: String,
      enum: ["active", "inactive", "verify", "provisional", "proposed"],
      default: "active",
    },
  },
  { timestamps: true }
);

/*
|--------------------------------------------------------------------------
| Unique identity: shortName + collegeType (the scrapper's linkage key)
|--------------------------------------------------------------------------
*/
collegeSchema.index({ shortName: 1, collegeType: 1 }, { unique: true });

/* Filter indexes */
collegeSchema.index({ state: 1 });
collegeSchema.index({ collegeType: 1 });
collegeSchema.index({ ownership: 1 });
collegeSchema.index({ courses: 1 });

export const College = mongoose.model("College", collegeSchema);