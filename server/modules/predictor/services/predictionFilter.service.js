import {ownershipVariants} from "./ownership.js";

export const buildPredictionFilter = async ({
  courseId,
  counsellingType,
  state,
  seatType,
  category,
  collegeType,
  round,
  year,
}) => {
  const filter = { status: "active" };
   // courseId may be a single id or an array (PG sends all 5 PG course ids).
  if (courseId) {
    filter.courseId = Array.isArray(courseId) ? { $in: courseId } : courseId;
  }
  if (counsellingType) filter.counsellingType = counsellingType;
  if (seatType) filter.seatType = seatType;
  if (category) filter.category = category;

  // Ownership lives reliably on the College doc, spread across 8 raw values.
  // Map the chosen bucket -> its variants -> matching college ids.
  if (collegeType && collegeType !== "Both") {
    const variants = ownershipVariants(collegeType) || [collegeType];
    const owned = await College.find({ ownership: { $in: variants } }).select("_id").lean();
    filter.collegeId = { $in: owned.map((c) => c._id) };
  }

  if (counsellingType === "STATE" && state) filter.state = state;
  return filter;
};