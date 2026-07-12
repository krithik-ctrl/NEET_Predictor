export const buildPredictionFilter = ({
  courseId,
  counsellingType,
  state,
  seatType,
  category,
  collegeType,
  round,
  year,
}) => {
  const filter = {
    status: "active",
  };

  if (courseId) filter.courseId = courseId;
  if (counsellingType) filter.counsellingType = counsellingType;
  if (seatType) filter.seatType = seatType;
  if (category) filter.category = category;
  if(collegeType && collegeType !== "Both"){filter.collegeType=collegeType}
  if (round) filter.round = round;
  if (year) filter.year = year;

  // Apply state filter only for State counselling
  if (counsellingType === "STATE" && state) {
    filter.state = state;
  }

  return filter;
};
