import { User } from "../../../users/user.model.js";
import { StudentProfile } from "../../../student-profile/studentProfile.model.js";
import { Subscription } from "../../../subscription/subscription.model.js";
import { PredictionHistory } from "../../../prediction-history/predictionHistory.model.js";
import { SavedCollege } from "../../../saved-colleges/savedCollege.model.js";
import { ChoiceList } from "../../../choice-list/choiceList.model.js";

export const getUserDetails =
  async (userId) => {

    const [
      user,
  profile,
  subscription,
  predictionCount,
  savedCollegeCount,
  choiceListCount,
  predictionHistory,
  savedColleges,
  choiceLists,
    ] = await Promise.all([



      User.findById(userId).lean(),

      StudentProfile.findOne({
        userId,
      })
        .populate(
          "preferredCourse",
          "name"
        )
        .lean(),

      Subscription.findOne({
        userId,
      })
        .populate(
          "planId",
          "name"
        )
        .lean(),

      PredictionHistory.countDocuments({
        userId,
      }),

      SavedCollege.countDocuments({
        userId,
      }),

      ChoiceList.countDocuments({
        userId,
      }),
      PredictionHistory.find({ userId })
  .populate("courseId", "name")
  .sort({ createdAt: -1 })
  .lean(),

  SavedCollege.find({ userId })
  .populate(
    "collegeId",
    "name state city ownership"
  )
  .lean(),
  ChoiceList.find({ userId })
.sort({ createdAt:-1 })
.lean(),

    ]);
 
    if (!user) {
      throw new Error(
        "User not found."
      );
    }

    return {

      user: {

        id:
          user._id,

        firstName:
          user.firstName,

        lastName:
          user.lastName,

        email:
          user.email,

        mobile:
          user.mobile,

        role:
          user.role || "student",

        isVerified:
          user.isVerified,

        isActive:
          user.isActive,

        joinedDate:
          user.createdAt,

        lastLogin:
          user.lastLogin,

      },

      subscription: {

        plan:
          subscription?.planId?.name ||
          null,

        status:
          subscription?.status ||
          null,

        startDate:
          subscription?.startDate ||
          null,

        endDate:
          subscription?.endDate ||
          null,

      },

      profile: {

        gender:
          profile?.gender ||
          null,

        state:
          profile?.state ||
          null,

        city:
          profile?.city ||
          null,

        budget:
          profile?.budget ||
          null,

        preferredCourse:
          profile?.preferredCourse
            ?.name || null,

        profileCompleted:
          profile?.profileCompleted ||
          false,

      },

      statistics: {

        predictions:
          predictionCount,

        savedColleges:
          savedCollegeCount,

        choiceLists:
          choiceListCount,

      },
      predictionHistory: predictionHistory.map(item => ({
  course: item.courseId?.name,
  counsellingType: item.counsellingType,
  predictorState: item.predictorState,
  domicileState: item.domicileState,
  seatType: item.seatType,
  category: item.category,
  round: item.round,
  totalResults: item.totalResults,
  safeCount: item.safeCount,
  moderateCount: item.moderateCount,
  riskyCount: item.riskyCount,
  generatedAt: item.generatedAt,
})),
savedColleges: savedColleges.map(item => ({
  id: item.collegeId?._id,
  name: item.collegeId?.name,
  state: item.collegeId?.state,
  city: item.collegeId?.city,
  ownership: item.collegeId?.ownership,
})),
choiceLists: choiceLists.map(item => ({
  id: item._id,
  name: item.name,
  status: item.status,
  createdAt: item.createdAt,
})),

    };

  };