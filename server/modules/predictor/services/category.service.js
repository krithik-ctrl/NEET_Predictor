export const getCategories = ({
  config,
  seatType,
}) => {

  if (!config) {
    throw new Error(
      "Configuration is required."
    );
  }

  if (!seatType) {
    throw new Error(
      "Seat Type is required."
    );
  }

  const categories =

    config.categories[
      seatType
    ];

  if (!categories) {
    throw new Error(
      "Invalid Seat Type."
    );
  }

  return categories;

};