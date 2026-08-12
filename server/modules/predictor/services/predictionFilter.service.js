import  {College} from "../../colleges/college.model.js";
export const buildPredictionFilter = async ({ courseId, counsellingType, state, seatType, category, collegeType, round, year }) => {
  const filter = { status: "active" };

  if (courseId) filter.courseId = courseId;
  if (counsellingType) filter.counsellingType = counsellingType;
  if (seatType) filter.seatType = seatType;
  if (category) filter.category = category;
// Ownership lives reliably on the College doc ("Government"/"Private"),
// not on the messy free-string cutoff.collegeType. Resolve → college IDs.
if (collegeType && collegeType !== "Both") {
  const owned = await College.find({ ownership: collegeType }).select("_id").lean();
  // $in:[] naturally matches nothing → empty results, no special-casing needed.
  filter.collegeId = { $in: owned.map((c) => c._id) };
}  if (year) filter.year = year;
  if (counsellingType === "STATE" && state) filter.state = state;

  return filter;
};