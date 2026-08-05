import { resolveProvider } from "./dataSourceRouting";

export const buildPredictionFilter = ({
  courseId, counsellingType, state, seatType, category, collegeType, year,
}) => {
  const filter = { status: "active" };

  if (courseId) filter.courseId = courseId;
  if (counsellingType) filter.counsellingType = counsellingType;
  if (seatType) filter.seatType = seatType;
  if (category) filter.category = category;
  if (collegeType && collegeType !== "Both") filter.collegeType = collegeType;
  if (year) filter.year = year;
  if (counsellingType === "STATE" && state) filter.state = state;

  // Funnel layer: route matched segments to a specific provider.
  const provider = resolveProvider({ courseId, counsellingType, seatType });
  if (provider) filter.provider = provider;

  return filter;
};