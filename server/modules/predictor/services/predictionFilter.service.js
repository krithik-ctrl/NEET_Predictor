export const buildPredictionFilter = ({
  courseId,
  counsellingType,
  seatType,
  category,
  round,
  year,
}) => {

  const filter = {
    status: "active",
  };

  if (courseId) filter.courseId = courseId;
  if (seatType) filter.seatType = seatType;
  if (category) filter.category = category;
  if (round) filter.round = round;
  if (year) filter.year = year;

  filter.quota =
    counsellingType === "AIQ"
      ? "AIQ"
      : "STATE";

  return filter;

};