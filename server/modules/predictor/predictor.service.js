import { StudentProfile } from "../student-profile/studentProfile.model.js";
import { Cutoff } from "../cutoffs/cutoff.model.js";
import { createPredictionHistory, countTodayPredictions,} from "../prediction-history/predictionHistory.service.js";
import {
  checkSubscription,
} from "../subscription/subscription.helper.js";


export const predictColleges = async (
  userId
) => {

  const subscription =
  await checkSubscription(
    userId
  );

if (
  subscription.isFree
) {

  const todayPredictions =
    await countTodayPredictions(
      userId
    );

  if (
    todayPredictions >= 3
  ) {
    throw new Error(
      "Daily prediction limit reached. Upgrade to Premium for unlimited predictions."
    );
  }

}

  const profile =
    await StudentProfile.findOne({
      userId,
    });

  if (!profile) {
    throw new Error(
      "Student profile not found"
    );
  }

  if (
    !profile.profileCompleted
  ) {
    throw new Error(
      "Complete your profile first"
    );
  }

  const query = {
    courseId:
      profile.preferredCourse,
    category:
      profile.category,
    quota: profile.quota,
    status: "active",
  };

  let cutoffs =
    await Cutoff.find(query)
      .populate(
        "collegeId"
      )
      .populate(
        "courseId"
      )
      .lean();

  if (
    profile.quota ===
      "State" &&
    profile.domicileState
  ) {
    cutoffs = cutoffs.filter(
      (cutoff) =>
        cutoff.collegeId
          ?.state ===
        profile.domicileState
    );
  }

  if (profile.budget) {
    cutoffs = cutoffs.filter(
      (cutoff) =>
        cutoff.fees <=
        profile.budget
    );
  }

  const safe = [];
  const moderate = [];
  const risky = [];

  for (const cutoff of cutoffs) {

    const closingRank =
      cutoff.closingRank;

    const safeLimit =
      Math.floor(
        closingRank * 0.8
      );

    const result = {
      cutoffId:
        cutoff._id,

      college:
        cutoff.collegeId,

      course:
        cutoff.courseId,

      quota:
        cutoff.quota,

      category:
        cutoff.category,

      fees:
        cutoff.fees,

      openingRank:
        cutoff.openingRank,

      closingRank:
        cutoff.closingRank,

      studentRank:
        profile.rank,
    };

    if (
      profile.rank <=
      safeLimit
    ) {
      safe.push({
        ...result,
        prediction:
          "SAFE",
      });
    } else if (
      profile.rank <=
      closingRank
    ) {
      moderate.push({
        ...result,
        prediction:
          "MODERATE",
      });
    } else {
      risky.push({
        ...result,
        prediction:
          "RISKY",
      });
    }
  }

  safe.sort(
    (a, b) =>
      a.closingRank -
      b.closingRank
  );

  moderate.sort(
    (a, b) =>
      a.closingRank -
      b.closingRank
  );

  risky.sort(
    (a, b) =>
      a.closingRank -
      b.closingRank
  );
await createPredictionHistory(
  userId,
  {
    courseId:
      profile.preferredCourse,

    rank:
      profile.rank,

    category:
      profile.category,

    quota:
      profile.quota,

    totalResults:
      safe.length +
      moderate.length +
      risky.length,

    safeCount:
      safe.length,

    moderateCount:
      moderate.length,

    riskyCount:
      risky.length,
  }
);
  return {
    profile: {
      rank: profile.rank,
      category:
        profile.category,
      quota:
        profile.quota,
    },

    totalResults:
      safe.length +
      moderate.length +
      risky.length,

    safe,
    moderate,
    risky,
  };
};