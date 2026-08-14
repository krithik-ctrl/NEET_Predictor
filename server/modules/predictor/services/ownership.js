// Single source of truth for how the 8 raw College.ownership values collapse
// into the 2 buckets the predictor/explorer expose. Change it here, everywhere
// updates. Reverse map is exported too for display/consistency elsewhere.
import { College } from "../../colleges/college.model.js";
export const OWNERSHIP_BUCKETS = {
  Government: ["Government", "AIIMS", "Central", "ESIC", "Municipal", "Government Aided"],
  Private: ["Private", "Deemed"],
};

// "AIIMS" -> "Government", "Deemed" -> "Private", etc.
export const OWNERSHIP_TO_BUCKET = Object.freeze(
  Object.entries(OWNERSHIP_BUCKETS).reduce((acc, [bucket, values]) => {
    values.forEach((v) => (acc[v] = bucket));
    return acc;
  }, {})
);

// Returns the raw ownership variants for a bucket, or null if it's not a known
// bucket (e.g. "Both" / undefined -> caller adds no ownership constraint).
export const ownershipVariants = (collegeType) => OWNERSHIP_BUCKETS[collegeType] || null;