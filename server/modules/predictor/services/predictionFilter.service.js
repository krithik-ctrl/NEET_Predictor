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
  if (courseId) filter.courseId = courseId;
  if (counsellingType) filter.counsellingType = counsellingType;
  if (seatType) filter.seatType = seatType;
  if (category) filter.category = category;
  if (collegeType && collegeType !== "Both") {
    const owned = await College.find({ ownership: collegeType }).select("_id").lean();
    filter.collegeId = { $in: owned.map((c) => c._id) };
  }
  if (counsellingType === "STATE" && state) filter.state = state;
  return filter;
};