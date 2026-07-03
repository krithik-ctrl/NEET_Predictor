import {
  getPredictionDashboard,
} from "./services/prediction-dashboard.service.js";

import {
  getSavedCollegeDashboard,
} from "./services/saved-college-dashboard.service.js";

import {
  getChoiceListDashboard,
} from "./services/choice-list-dashboard.service.js";

import {
  getRecentActivity,
} from "./services/recent-activity.service.js";

import {
  checkSubscription,
} from "../subscription/subscription.helper.js";

import { StudentProfile } from "../student-profile/studentProfile.model.js";

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


  const [
  profile,
  predictionDashboard,
  savedCollegeDashboard,
  choiceListDashboard,
  recentActivity,
] = await Promise.all([

  StudentProfile.findOne({
    userId,
  })
    .populate(
      "preferredCourse"
    )
    .populate(
      "userId",
      "firstName lastName avatar"
    )
    .lean(),

  getPredictionDashboard(
    userId
  ),

  getSavedCollegeDashboard(
    userId
  ),

  getChoiceListDashboard(
    userId
  ),

  getRecentActivity(
    userId
  ),

]);


let readinessScore = 0;

if (profile?.profileCompleted) {
  readinessScore += 25;
}

if (
  predictionDashboard.predictionCount >= 5
) {
  readinessScore += 25;
}

if (
  savedCollegeDashboard.savedColleges >= 8
) {
  readinessScore += 25;
}

if (
  choiceListDashboard.choiceLists >= 1
) {
  readinessScore += 25;
}

let readinessStatus =
  "Getting Started";

if (readinessScore === 100) {

  readinessStatus =
    "Counselling Ready";

} else if (
  readinessScore >= 75
) {

  readinessStatus =
    "Almost Ready";

} else if (
  readinessScore >= 50
) {

  readinessStatus =
    "In Progress";

}

let nextAction = {

  title:
    "You're all set!",

  description:
    "Continue exploring colleges.",

};

if (
  !profile?.profileCompleted
) {

  nextAction = {

    title:
      "Complete Profile",

    description:
      "Complete your profile to unlock personalized predictions.",

  };

} else if (
  predictionDashboard.predictionCount < 5
) {

  nextAction = {

    title:
      "Generate Predictions",

    description:
      "Generate more predictions to improve your counselling preparation.",

  };

} else if (
  savedCollegeDashboard.savedColleges < 8
) {

  nextAction = {

    title:
      "Save Colleges",

    description:
      "Save your preferred colleges for easy comparison.",

  };

} else if (
  choiceListDashboard.choiceLists === 0
) {

  nextAction = {

    title:
      "Create Choice List",

    description:
      "Organize your saved colleges into a choice list.",

  };

}



    return {

  profile:
    profile
      ? {

          firstName:
            profile.userId
              ?.firstName,

          lastName:
            profile.userId
              ?.lastName,

          avatar:
            profile.userId
              ?.avatar,

          preferredCourse:
            profile
              ?.preferredCourse
              ?.name || null,

          profileCompleted:
            profile
              ?.profileCompleted,

        }
      : null,

  statistics: {

    predictionCount:
      predictionDashboard.predictionCount,

    savedColleges:
      savedCollegeDashboard.savedColleges,

    choiceLists:
      choiceListDashboard.choiceLists,

    choiceListColleges:
      choiceListDashboard.choiceListColleges,

  },

  subscription: {

    currentPlan:
      subscription.plan,

    isPremium:
      subscription.isPremium,

  },

  usage: {

    predictionsToday:
      predictionDashboard.predictionsToday,

    predictionLimit:
      subscription.isPremium
        ? "Unlimited"
        : 3,

    savedColleges:
      savedCollegeDashboard.savedColleges,

    savedCollegeLimit:
      subscription.isPremium
        ? "Unlimited"
        : 20,

    choiceLists:
      choiceListDashboard.choiceLists,

    choiceListLimit:
      subscription.isPremium
        ? "Unlimited"
        : 1,

  },

  readiness: {

    score:
      readinessScore,

    status:
      readinessStatus,

  },

  nextAction,

  latestPredictions:
    predictionDashboard
      .latestPredictions,

  recentSavedColleges:
    savedCollegeDashboard
      .recentSavedColleges,

  recentChoiceLists:
    choiceListDashboard
      .recentChoiceLists,

  recentActivity:
    recentActivity
      .recentActivity,

};
  };