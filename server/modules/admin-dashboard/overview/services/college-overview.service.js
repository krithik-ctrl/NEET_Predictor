import { College } from "../../../colleges/college.model.js";

export const getCollegeOverview =
  async () => {
    const [
      totalColleges,
      activeColleges,
      inactiveColleges,
      governmentColleges,
      privateColleges,
      deemedColleges,
    ] = await Promise.all([
      College.countDocuments(),

      College.countDocuments({
        status: "active",
      }),

      College.countDocuments({
        status: "inactive",
      }),

      College.countDocuments({
        ownership: "Government",
      }),

      College.countDocuments({
        ownership: "Private",
      }),

      College.countDocuments({
        ownership: "Deemed",
      }),
    ]);

    return {
      colleges: {
        total: totalColleges,
        active: activeColleges,
        inactive: inactiveColleges,
        government: governmentColleges,
        private: privateColleges,
        deemed: deemedColleges,
      },
    };
  };