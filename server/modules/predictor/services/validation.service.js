import { getCategories } from "./category.service.js";

export const validateSeatTypeAndCategory =
  ({
    config,
    seatType,
    category,
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

    if (!category) {
      throw new Error(
        "Category is required."
      );
    }

    const categories =
      getCategories({
        config,
        seatType,
      });

    const isValid =
      categories.includes(
        category
      );

    if (!isValid) {
      throw new Error(
        "Invalid Category selected for the chosen Seat Type."
      );
    }

    return true;

  };