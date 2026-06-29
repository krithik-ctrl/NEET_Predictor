import { StudentProfile } from "../student-profile/studentProfile.model.js";
import { SavedCollege } from "../saved-colleges/savedCollege.model.js";
import { ChoiceList } from "../choice-list/choiceList.model.js";
import { PredictionHistory } from "../prediction-history/predictionHistory.model.js";
import {
  checkSubscription,
} from "../subscription/subscription.helper.js";

import {
  countTodayPredictions,
} from "../prediction-history/predictionHistory.service.js";



export const getDashboard =
  async (userId) => {

    if (!userId) {
      throw new Error(
        "User ID is required"
      );
    }
const subscription =
  await checkSubscription(
    userId
  );

const predictionsToday =
  await countTodayPredictions(
    userId
  );
    const [
      profile,
      savedColleges,
      choiceLists,
      predictionCount,
      latestPrediction,
    ] = await Promise.all([
    StudentProfile.findOne({
  userId,
})
.populate("preferredCourse")
.populate(
  "userId",
  "name"
),

      SavedCollege.countDocuments({
        userId,
      }),

      ChoiceList.countDocuments({
        userId,
      }),

      PredictionHistory.countDocuments(
        {
          userId,
        }
      ),

      PredictionHistory.findOne({
        userId,
      })
        .populate("courseId")
        .sort({
          createdAt: -1,
        }),
    ]);

    return {
      profile: profile
        ? {
           name:
  profile.userId?.name,
            course:
              profile
                .preferredCourse
                ?.name || null,
            rank: profile.rank,
            category:
              profile.category,
            quota:
              profile.quota,
            profileCompleted:
              profile.profileCompleted,
          }
        : null,

      statistics: {
        savedColleges,
        choiceLists,
        predictionCount,
      },
subscription: {

  currentPlan:
    subscription.plan,

  isPremium:
    subscription.isPremium,

},

usage: {

  predictionsToday,

  predictionLimit:
    subscription.isPremium
      ? "Unlimited"
      : 3,

  savedColleges,

  savedCollegeLimit:
    subscription.isPremium
      ? "Unlimited"
      : 20,

  choiceLists,

  choiceListLimit:
    subscription.isPremium
      ? "Unlimited"
      : 1,

},
      latestPrediction:
        latestPrediction
          ? {
              course:
                latestPrediction
                  .courseId?.name,
              rank:
                latestPrediction.rank,
              totalResults:
                latestPrediction.totalResults,
              safeCount:
                latestPrediction.safeCount,
              moderateCount:
                latestPrediction.moderateCount,
              riskyCount:
                latestPrediction.riskyCount,
              generatedAt:
                latestPrediction.generatedAt,
            }
          : null,
    };
  };