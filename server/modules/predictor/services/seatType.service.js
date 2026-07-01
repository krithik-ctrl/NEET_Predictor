export const getSeatTypes = ({
  seatTypes,
}) => {

  if (
    !seatTypes ||
    !Array.isArray(
      seatTypes
    )
  ) {
    throw new Error(
      "Seat Types not found."
    );
  }

  return seatTypes;

};