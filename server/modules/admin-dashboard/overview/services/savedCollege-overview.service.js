import { SavedCollege } from "../../../saved-colleges/savedCollege.model.js";

export const getSavedCollegeOverview =
  async () => {
    const totalSavedColleges =
      await SavedCollege.countDocuments();

    return {
      savedColleges: {
        total: totalSavedColleges,
      },
    };
  };