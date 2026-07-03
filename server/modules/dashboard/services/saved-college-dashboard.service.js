import { SavedCollege } from "../../saved-colleges/savedCollege.model.js";

export const getSavedCollegeDashboard =
  async (userId) => {

    if (!userId) {
      throw new Error(
        "User ID is required"
      );
    }

    const [
      savedColleges,
      recentSavedColleges,
    ] = await Promise.all([

      SavedCollege.countDocuments({
        userId,
      }),

      SavedCollege.find({
        userId,
      })
        .populate(
          "collegeId",
          "name state city ownership"
        )
        .sort({
          createdAt: -1,
        })
        .limit(3)
        .lean(),

    ]);

    return {

      savedColleges,

      recentSavedColleges:
        recentSavedColleges.map(
          (college) => ({

            id:
              college.collegeId?._id,

            name:
              college.collegeId?.name,

            state:
              college.collegeId?.state,

            city:
              college.collegeId?.city,

            ownership:
              college.collegeId?.ownership,

            savedAt:
              college.createdAt,

          })
        ),

    };

  };