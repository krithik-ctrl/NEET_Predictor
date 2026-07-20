import { buildPredictionFilter } from "./services/predictionFilter.service.js";
import { Cutoff } from "../cutoffs/cutoff.model.js";
import { createPredictionHistory, countTodayPredictions,} from "../prediction-history/predictionHistory.service.js";
import {
  checkSubscription,
} from "../subscription/subscription.helper.js";


import {
  getEligibility
} from "./services/eligibility.service.js";

import {
  getCategories,
} from "./services/category.service.js";

import {User} from "../users/user.model.js";
export const predictColleges = async (
  userId,
   payload
) => {

const {
  rank,
  courseId,
  counsellingType,
  state:predictorState,
  domicileState,
  seatType,
  category,
  collegeType,
  round,
  year,
  budget,
  
} = payload;


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
    todayPredictions >= 15
  ) {
    throw new Error(
      "Daily prediction limit reached. Upgrade to Premium for unlimited predictions."
    );
  }

}

  const user = await User.findById(userId);

if (!user) {
  throw new Error(
    "User not found"
  );
}

if (!user.isVerified) {
  throw new Error(
    "Verify your mobile number first"
  );
}

if (!user.isActive) {
  throw new Error(
    "Your account is inactive"
  );
}

 const query = buildPredictionFilter({
  courseId,
  counsellingType,
  state:predictorState,
  seatType,
  category,
  collegeType,
  round,
  year,
});


  let cutoffs =
    await Cutoff.find(query)
      .populate(
        "collegeId"
      )
      .populate(
        "courseId"
      )
      .lean();






 if (budget) {
  cutoffs = cutoffs.filter(
    (cutoff) =>
      cutoff.fees <= budget
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

    cutoffId: cutoff._id,

    college: cutoff.collegeId,

    course: cutoff.courseId,

    quota: cutoff.quota,

    seatType: cutoff.seatType,

    category: cutoff.category,

    round: cutoff.round,

    year: cutoff.year,

    fees: cutoff.fees,

    openingRank:
      cutoff.openingRank,

    closingRank:
      cutoff.closingRank,

    studentRank: rank,

  };


  if (rank <= safeLimit) {

    safe.push({
      ...result,
      prediction: "SAFE",
    });

  } else if (
    rank <= closingRank
  ) {

    moderate.push({
      ...result,
      prediction: "MODERATE",
    });

  } else {

    risky.push({
      ...result,
      prediction: "RISKY",
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


const predictionHistory =
  await createPredictionHistory(userId, {
    courseId,

    rank,
    category,
    counsellingType,
    predictorState,
    domicileState,
    seatType,
    round,
    year,

    totalResults:
      safe.length +
      moderate.length +
      risky.length,

    safeCount: safe.length,

    moderateCount: moderate.length,

    riskyCount: risky.length,

    safe,

    moderate,

    risky,
  });

return {
  historyId:
    predictionHistory._id,

  profile: {
    rank,
    category,
    counsellingType,
    predictorState,
    domicileState,
    seatType,
    round,
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

export const getSeatTypes = async ({
  counsellingType,
  predictorState,
  domicileState,
}) => {

  const seatTypes =
    await getEligibility({

      counsellingType,

      predictorState,

      domicileState,

    });

  return seatTypes;

};

export const getCategoriesType = async ({
  counsellingType,
  predictorState,
  domicileState,
  seatType,
}) => {

  const {
    config,
  } = getEligibility({

    counsellingType,

    predictorState,

    domicileState,

  });

  return getCategories({

    config,

    seatType,

  });

};
