import { buildPredictionFilter } from "./services/predictionFilter.service.js";
import mongoose from "mongoose";
import { Cutoff } from "../cutoffs/cutoff.model.js";
import { createPredictionHistory, countTodayPredictions,} from "../prediction-history/predictionHistory.service.js";
import {
  checkSubscription,
} from "../subscription/subscription.helper.js";
import { pickLastRound } from "./services/dataSourceRouting.js";
import { OWNERSHIP_BUCKETS, ownershipVariants } from "./services/ownership.js";

import {
  getEligibility
} from "./services/eligibility.service.js";
import { College } from "../colleges/college.model.js";
import {
  getCategories,
} from "./services/category.service.js";

import { User } from "../users/user.model.js";
import { Admin } from "../admin/admin.model.js";
import { resolveLockedRank, setPreferredCourseIfUnset } from "../student-profile/studentProfile.service.js";

// Free-plan daily prediction cap — single source of truth (predictor + /predictions/usage).
export const FREE_DAILY_PREDICTION_LIMIT = 3;

export const predictColleges = async (
  userId,
  payload,
  role = "student"
) => {

const {
  rank: requestedRank,
  courseId,
  counsellingType,
  domicileState,
  seatType,
  category,
  collegeType,
  round,
  year,
  budget,
} = payload;

console.log(payload.courseId);
// Feeds the query exactly as before (reads payload.state) — colleges returned stay identical.
const filterState = payload.predictorState;
// The predictor state the frontend actually sends. Captured for storage + display ONLY,
// intentionally NOT passed into the query, so prediction results don't change.
const predictorState = payload.predictorState ?? null;

const isAdminCaller =
  role === "admin" ||
  role === "sub-admin" ||
  role === "super-admin";

let rank;

if (isAdminCaller) {

  const admin = await Admin.findById(userId);

  if (!admin) {
    throw new Error(
      "Admin not found"
    );
  }

  if (!admin.isVerified) {
    throw new Error(
      "Verify your mobile number first"
    );
  }

  if (!admin.isActive) {
    throw new Error(
      "Your account is inactive"
    );
  }

  // Admins are never subscription-limited and never rank-locked —
  // the requested rank is used as-is, every time.
  rank = requestedRank;

} else {

  const subscription = await checkSubscription(userId);

  if (!subscription.isPremium) {
    const todayPredictions = await countTodayPredictions(userId);

    if (todayPredictions >= FREE_DAILY_PREDICTION_LIMIT) {
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

  rank = await resolveLockedRank(userId, requestedRank);

}

 const query = await buildPredictionFilter({
  courseId,
  counsellingType,
  state: filterState,
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
 cutoffs = pickLastRound(cutoffs); 
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
    seats: cutoff.seats,
    beds: cutoff.beds,
    bondYears: cutoff.bondYears,
    bondPenalty: cutoff.bondPenalty,
    stipend: cutoff.stipend,
    specializationShort: cutoff.specializationShort ?? null,
    specializationFull:  cutoff.specializationFull ?? null,
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
const historyCourseId = Array.isArray(courseId) ? courseId[0] : courseId;
const predictionHistory =
  await createPredictionHistory(userId, {
    courseId: historyCourseId,

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
  }, { isAdmin: isAdminCaller });

// Auto-capture the student's course on first prediction (set-if-unset, not locked).
// Best-effort: a failure here must never fail the prediction itself.
if (!isAdminCaller) {
  try {
    await setPreferredCourseIfUnset(userId, courseId);
  } catch (error) {
    console.error("preferredCourse capture failed:", error?.message);
  }
}

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
/*
|--------------------------------------------------------------------------
| Data-driven options (optional courseId)
|--------------------------------------------------------------------------
| When courseId is sent, the config lists are intersected with the values
| that actually have active cutoffs for that course (+ counselling, + state
| for STATE), so the dropdowns never offer empty combinations. Config order
| is preserved. Without courseId, behaviour is unchanged (full config).
| Read-only: the prediction engine is not touched.
*/

// Normalises courseId (string or PG array) → array of ids, or null if not sent.
const normalizeOptionCourseIds = (courseId) => {
  const ids = (Array.isArray(courseId) ? courseId : [courseId])
    .filter((id) => id !== undefined && id !== null && String(id).trim() !== "")
    .map((id) => String(id).trim());

  if (!ids.length) return null;

  if (!ids.every((id) => mongoose.isValidObjectId(id))) {
    const error = new Error("Invalid courseId.");
    error.status = 400;
    throw error;
  }

  return ids;
};

// Same shape the prediction filter uses for course / counselling / state.
const buildOptionFilter = ({ courseIds, counsellingType, predictorState, seatType }) => {
  const filter = {
    status: "active",
    courseId: courseIds.length === 1 ? courseIds[0] : { $in: courseIds },
    counsellingType,
  };
  if (counsellingType === "STATE" && predictorState) filter.state = predictorState;
  if (seatType) filter.seatType = seatType;
  return filter;
};

// STATE-counselling states that have active cutoffs for the course (sorted).
export const getPredictorStates = async ({ courseId }) => {
  const courseIds = normalizeOptionCourseIds(courseId);
  if (!courseIds) {
    const error = new Error("courseId is required.");
    error.status = 400;
    throw error;
  }

  const states = await Cutoff.distinct(
    "state",
    buildOptionFilter({ courseIds, counsellingType: "STATE" })
  );

  return states
    .filter((state) => typeof state === "string" && state.trim() !== "")
    .sort((a, b) => a.localeCompare(b));
};

export const getSeatTypes = async ({
  counsellingType,
  predictorState,
  domicileState,
  courseId,
}) => {

  const seatTypes =
    await getEligibility({

      counsellingType,

      predictorState,

      domicileState,

    });

  const courseIds = normalizeOptionCourseIds(courseId);
  if (!courseIds) return seatTypes;

  const available = new Set(
    await Cutoff.distinct(
      "seatType",
      buildOptionFilter({ courseIds, counsellingType, predictorState })
    )
  );

  // Never mutate the shared config module — return a pruned copy.
  const prunedCategories = Object.fromEntries(
    Object.entries(seatTypes.config.categories).filter(([name]) => available.has(name))
  );

  return {
    ...seatTypes,
    config: { ...seatTypes.config, categories: prunedCategories },
    seatTypes: Array.isArray(seatTypes.seatTypes)
      ? seatTypes.seatTypes.filter((name) => available.has(name))
      : seatTypes.seatTypes,
    availableSeatTypes: Object.keys(prunedCategories),
  };

};

export const getCategoriesType = async ({
  counsellingType,
  predictorState,
  domicileState,
  seatType,
  courseId,
}) => {

  const {
    config,
  } = getEligibility({

    counsellingType,

    predictorState,

    domicileState,

  });

  const categories = getCategories({

    config,

    seatType,

  });

  const courseIds = normalizeOptionCourseIds(courseId);
  if (!courseIds) return categories;

  const available = new Set(
    await Cutoff.distinct(
      "category",
      buildOptionFilter({ courseIds, counsellingType, predictorState, seatType })
    )
  );

  return categories.filter((name) => available.has(name));

};

/**
 * Which college-type buckets actually have colleges for the current selection.
 * Powers the predictor's smart guard: AIQ + "All India Quota" seat type
 * returns { Government: 500+, Private: 0 } because that seat type is govt-only.
 * Reuses buildPredictionFilter (minus collegeType) so filter logic never forks.
 */
export const getCollegeTypeAvailability = async ({
  courseId,
  counsellingType,
  seatType,
  category,
  state,
}) => {
  // Same filter the prediction uses, WITHOUT the collegeType constraint.
  const base = await buildPredictionFilter({ courseId, counsellingType, seatType, category, state });

  // Colleges that have at least one matching cutoff for this selection.
  const collegeIds = await Cutoff.distinct("collegeId", base);

  if (collegeIds.length === 0) {
    return {
      counts: { Government: 0, Private: 0 },
      available: { Government: false, Private: false, Both: false },
    };
  }

  const [government, privateCount] = await Promise.all([
    College.countDocuments({ _id: { $in: collegeIds }, ownership: { $in: OWNERSHIP_BUCKETS.Government } }),
    College.countDocuments({ _id: { $in: collegeIds }, ownership: { $in: OWNERSHIP_BUCKETS.Private } }),
  ]);

  return {
    counts: { Government: government, Private: privateCount },
    available: {
      Government: government > 0,
      Private: privateCount > 0,
      Both: government + privateCount > 0,
    },
  };
};

/*
|--------------------------------------------------------------------------
| Prediction usage (read-only) — today's count vs the free daily limit.
| Premium = paid plan (price > 0) via the price-based checkSubscription.
|--------------------------------------------------------------------------
*/

export const getPredictionUsage = async (userId) => {

  const [subscription, used] = await Promise.all([
    checkSubscription(userId),
    countTodayPredictions(userId),
  ]);

  const isPremium = subscription.isPremium === true;

  return {
    used,
    limit: isPremium ? null : FREE_DAILY_PREDICTION_LIMIT,
    remaining: isPremium ? null : Math.max(0, FREE_DAILY_PREDICTION_LIMIT - used),
    isPremium,
    unlimited: isPremium,
  };

};
