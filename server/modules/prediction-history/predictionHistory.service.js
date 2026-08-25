import mongoose from "mongoose";

import { PredictionHistory } from "./predictionHistory.model.js";
import { College } from "../colleges/college.model.js";



export const createPredictionHistory = async (
  userId,
  payload
) => {

  if (!userId) {
    throw new Error("User ID is required");
  }

//   const buildPrediction = async (
//     college,
//     predictionType
//   ) => {

//     const collegeDoc =
//       await College.findById(
//         college.college
//       ).select("name state");

//    return {

//   collegeId:
//     college.college._id,

//   collegeName:
//     college.college.name,

//   state:
//     college.college.state,

//   courseId:
//     college.course ?? payload.courseId,

//   cutoffId:
//     college.cutoffId,
  
//   ownership:
//     college.college.ownership,

//   predictionType,

//   quota:
//     college.quota,

//   seatType:
//     college.seatType,

//   category:
//     college.category,

//   round:
//     college.round,

//   year:
//     college.year,

//   openingRank:
//     college.openingRank,

//   closingRank:
//     college.closingRank,

//   studentRank:
//     college.studentRank,

//   fees:
//     college.fees,

// };

//   };




const buildPrediction = async (
  college,
  predictionType
) => {

  const collegeData = college.college;
  return {

    collegeId:
      collegeData._id ?? null,

    collegeName:
      collegeData.name,

    state:
      collegeData.state,

    ownership:
      collegeData.ownership ?? null,

    courseId:
      college.course ?? payload.courseId,

    cutoffId:
      college.cutoffId ?? null,

    predictionType,

    quota:
      college.quota,

    seatType:
      college.seatType,

    category:
      college.category,

    round:
      college.round,

    year:
      college.year,

    openingRank:
      college.openingRank ?? null,

    closingRank:
      college.closingRank ?? null,

    studentRank:
      college.studentRank,

    fees:
      college.fees ?? null,

    seats:
      college.seats ?? null,

    beds:
      college.beds ?? null,

    bondYears:
      college.bondYears ?? null,

    bondPenalty:
      college.bondPenalty ?? null,

    stipend:
      college.stipend ?? null,
        specializationShort: college.specializationShort ?? null,
    specializationFull:  college.specializationFull ?? null,
    courseName: college.course?.name ?? null,

  };

};


  const predictedColleges = [

    ...(await Promise.all(

      (payload.safe || []).map(
        college =>
          buildPrediction(
            college,
            "SAFE"
          )
      )

    )),

    ...(await Promise.all(

      (payload.moderate || []).map(
        college =>
          buildPrediction(
            college,
            "MODERATE"
          )
      )

    )),

    ...(await Promise.all(

      (payload.risky || []).map(
        college =>
          buildPrediction(
            college,
            "RISKY"
          )
      )

    )),

  ];

  return await PredictionHistory.create({

    userId,

    courseId:
      payload.courseId,

    round:
      payload.round ?? null,

    counsellingType:
      payload.counsellingType,

    predictorState:
      payload.predictorState,

    domicileState:
      payload.domicileState,

    seatType:
      payload.seatType,

    category:
      payload.category,

    totalResults:
      payload.totalResults,

    safeCount:
      payload.safeCount,

    moderateCount:
      payload.moderateCount,

    riskyCount:
      payload.riskyCount,

    predictedColleges,

  });

};



export const getPredictionHistory =
  async (userId) => {

    if (!userId) {
      throw new Error(
        "User ID is required"
      );
    }

    return await PredictionHistory.find({
      userId,
    })
      .populate("courseId")
      .sort({
        createdAt: -1,
      });
  };

export const getPredictionHistoryById =
  async (
    userId,
    historyId
  ) => {

    if (
      !mongoose.Types.ObjectId.isValid(
        historyId
      )
    ) {
      throw new Error(
        "Invalid history ID"
      );
    }

    const history =
      await PredictionHistory
        .findOne({
          _id: historyId,
          userId,
        })
        .populate("courseId");

    if (!history) {
      throw new Error(
        "Prediction history not found"
      );
    }

    return history;
  };

export const deletePredictionHistory =
  async (
    userId,
    historyId
  ) => {

    if (
      !mongoose.Types.ObjectId.isValid(
        historyId
      )
    ) {
      throw new Error(
        "Invalid history ID"
      );
    }

    const history =
      await PredictionHistory.findOneAndDelete(
        {
          _id: historyId,
          userId,
        }
      );

    if (!history) {
      throw new Error(
        "Prediction history not found"
      );
    }

    return history;
  };

  export const countTodayPredictions =
  async (userId) => {

    if (!userId) {
      throw new Error(
        "User ID is required"
      );
    }

    const startOfDay =
      new Date();

    startOfDay.setHours(
      0,
      0,
      0,
      0
    );

    const endOfDay =
      new Date();

    endOfDay.setHours(
      23,
      59,
      59,
      999
    );

    return await PredictionHistory.countDocuments({

      userId,

      createdAt: {

        $gte: startOfDay,

        $lte: endOfDay,

      },

    });

  };




  // ============================================================================
// NEW — Paginated, filtered, sorted colleges for one prediction.
// Backend does dedup + filter + sort + pagination in a single aggregation so
// the frontend never loads the full predictedColleges array (4000+ for PG).
//
// Dedup grain: collegeId + courseId + specializationShort  → one row per
// college+course+branch (matches the current frontend behavior). seatType and
// category are constant within a prediction, so they aren't part of the grain.
//
// UG-safe: course/branch filters only apply when their query params are present.
// For UG the frontend never sends them, so the pipeline is a plain paginated list.
// ============================================================================
export const getPredictionColleges = async (userId, historyId, query = {}) => {
  if (!mongoose.Types.ObjectId.isValid(historyId)) {
    throw new Error("Invalid history ID");
  }

  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 25, 1), 100);
  const skip = (page - 1) * limit;

  // Filters (all optional). Absent filter = not applied → UG behaves as before.
  const course = query.course && query.course !== "All" ? String(query.course) : null;
  const state = query.state && query.state !== "All" ? String(query.state) : null;
  const type = query.type && query.type !== "All" ? String(query.type) : null;
  const chance = query.chance && query.chance !== "All" ? String(query.chance) : null;
  // branch is a comma-separated list of specializationShort values (PG only).
  const branches =
    query.branch && String(query.branch).trim()
      ? String(query.branch).split(",").map((b) => b.trim()).filter(Boolean)
      : [];

  // predictionType in the DB is SAFE|MODERATE|RISKY. The UI "chance" is
  // High|Medium|Low. Map incoming chance → predictionType for the DB match.
  const CHANCE_TO_TYPE = { High: "SAFE", Medium: "MODERATE", Low: "RISKY" };
  const predictionType = chance ? CHANCE_TO_TYPE[chance] ?? null : null;

  // sortBy: "cutoff" (closingRank asc) | "fees" (asc) | "feesHigh" (desc).
  const sortBy = query.sortBy || "cutoff";

  const oid = new mongoose.Types.ObjectId(historyId);

  const pipeline = [
    { $match: { _id: oid, userId: new mongoose.Types.ObjectId(userId) } },
    { $unwind: "$predictedColleges" },
    { $replaceRoot: { newRoot: "$predictedColleges" } },

    // DEDUP — one row per college + course + branch, keep the lowest closingRank.
    {
      $group: {
        _id: {
          collegeId: "$collegeId",
          courseId: "$courseId",
          specializationShort: "$specializationShort",
        },
        doc: { $first: "$$ROOT" },
        minClosing: { $min: "$closingRank" },
      },
    },
    // Rebuild the row, using the best (lowest) closing rank for that branch.
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: ["$doc", { closingRank: "$minClosing" }] },
      },
    },

    // FILTERS — each applied only when present (UG sends none of course/branch).
    ...(course ? [{ $match: { courseName: course } }] : []),
    ...(branches.length ? [{ $match: { specializationShort: { $in: branches } } }] : []),
    ...(state ? [{ $match: { state } }] : []),
    ...(type ? [{ $match: { ownership: type } }] : []),
    ...(predictionType ? [{ $match: { predictionType } }] : []),

    // SORT — chance priority first (SAFE→MODERATE→RISKY), then rank/fees.
    {
      $addFields: {
        _chanceOrder: {
          $switch: {
            branches: [
              { case: { $eq: ["$predictionType", "SAFE"] }, then: 0 },
              { case: { $eq: ["$predictionType", "MODERATE"] }, then: 1 },
              { case: { $eq: ["$predictionType", "RISKY"] }, then: 2 },
            ],
            default: 3,
          },
        },
        // Null/0 fees sort last for fee sorts (mirrors the frontend's feeOf()).
        _feeSort: {
          $cond: [{ $and: [{ $ne: ["$fees", null] }, { $gt: ["$fees", 0] }] }, "$fees", null],
        },
      },
    },
    {
      $sort:
        sortBy === "fees"
          ? { _chanceOrder: 1, _feeSort: 1, closingRank: 1 }
          : sortBy === "feesHigh"
          ? { _chanceOrder: 1, _feeSort: -1, closingRank: 1 }
          : { _chanceOrder: 1, closingRank: 1 },
    },

    // PAGINATE + COUNT in one pass.
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }, { $project: { _chanceOrder: 0, _feeSort: 0 } }],
        total: [{ $count: "count" }],
      },
    },
  ];

  const [result] = await PredictionHistory.aggregate(pipeline);

  // If the prediction doc doesn't exist / isn't owned by this user, aggregate
  // returns an empty data/total — surface a clear not-found for a bad id.
  if (!result) {
    throw new Error("Prediction history not found");
  }

  const total = result.total?.[0]?.count ?? 0;

  return {
    colleges: result.data ?? [],
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};




// ============================================================================
// NEW — Metadata + filter options + chance counts for one prediction, computed
// over the FULL prediction WITHOUT returning the (huge) predictedColleges array.
//
// The results page loads this ONCE to render: the applied-filter chips, the
// chance pills (with counts), and the filter dropdowns (State, Type, and — for
// PG only — Course and its Branches). The actual college rows come separately
// from getPredictionColleges (paginated).
//
// isPG is true only when at least one row carries a specialization, so the
// frontend shows Course/Branch filters for PG and hides them for UG.
// ============================================================================
export const getPredictionMeta = async (userId, historyId) => {
  if (!mongoose.Types.ObjectId.isValid(historyId)) {
    throw new Error("Invalid history ID");
  }

  const oid = new mongoose.Types.ObjectId(historyId);
  const uid = new mongoose.Types.ObjectId(userId);

  // 1) Metadata — everything EXCEPT the big array, with course populated.
  const meta = await PredictionHistory.findOne({ _id: oid, userId })
    .select("-predictedColleges")
    .populate("courseId")
    .lean();

  if (!meta) {
    throw new Error("Prediction history not found");
  }

  // 2) Options + counts — one aggregation over the full array, AFTER the same
  //    dedup grain used by getPredictionColleges (college+course+branch), so the
  //    counts match what the paginated list will actually show.
  const [agg] = await PredictionHistory.aggregate([
    { $match: { _id: oid, userId: uid } },
    { $unwind: "$predictedColleges" },
    { $replaceRoot: { newRoot: "$predictedColleges" } },
    {
      $group: {
        _id: {
          collegeId: "$collegeId",
          courseId: "$courseId",
          specializationShort: "$specializationShort",
        },
        doc: { $first: "$$ROOT" },
      },
    },
    { $replaceRoot: { newRoot: "$doc" } },
    {
      $facet: {
        // Distinct filter values (drop null/empty).
        courses: [
          { $group: { _id: "$courseName" } },
          { $match: { _id: { $nin: [null, "", "-"] } } },
          { $sort: { _id: 1 } },
        ],
        states: [
          { $group: { _id: "$state" } },
          { $match: { _id: { $nin: [null, "", "-"] } } },
          { $sort: { _id: 1 } },
        ],
        types: [
          { $group: { _id: "$ownership" } },
          { $match: { _id: { $nin: [null, "", "-"] } } },
          { $sort: { _id: 1 } },
        ],
                // NEW — distinct colleges across the FULL prediction (one college with
        // many branches counts once). Computed on collegeId BEFORE the branch-
        // level grouping, so it's true colleges, not cutoff rows.
        distinctColleges: [
          { $group: { _id: "$collegeId" } },
          { $count: "n" },
        ],
        // Branches grouped by course, so the frontend can show the right
        // specializations when a course is chosen.
        branchesByCourse: [
          {
            $match: {
              specializationShort: { $nin: [null, "", "-"] },
            },
          },
          {
            $group: {
              _id: "$courseName",
              branches: { $addToSet: "$specializationShort" },
            },
          },
        ],
        // Chance counts by predictionType (SAFE/MODERATE/RISKY).
        chanceCounts: [{ $group: { _id: "$predictionType", n: { $sum: 1 } } }],
        // Whether ANY row has a specialization → PG.
        pgFlag: [
          { $match: { specializationShort: { $nin: [null, "", "-"] } } },
          { $limit: 1 },
          { $count: "n" },
        ],
        // Total distinct rows (after dedup) — handy for the header count.
        totalRows: [{ $count: "n" }],
      },
    },
  ]);

  const courses = (agg?.courses ?? []).map((c) => c._id);
  const states = (agg?.states ?? []).map((s) => s._id);
  const types = (agg?.types ?? []).map((t) => t._id);

  // Shape branchesByCourse into a lookup: { [courseName]: [branch, ...] }.
  const branchesByCourse = {};
  for (const row of agg?.branchesByCourse ?? []) {
    branchesByCourse[row._id] = (row.branches ?? []).filter(Boolean).sort();
  }

  // Chance counts → High/Medium/Low (UI vocabulary).
  const rawCounts = {};
  for (const row of agg?.chanceCounts ?? []) rawCounts[row._id] = row.n;
  const counts = {
    High: rawCounts.SAFE ?? 0,
    Medium: rawCounts.MODERATE ?? 0,
    Low: rawCounts.RISKY ?? 0,
  };

  const isPG = (agg?.pgFlag?.[0]?.n ?? 0) > 0;
  const totalRows = agg?.totalRows?.[0]?.n ?? 0;
  const collegeCount = agg?.distinctColleges?.[0]?.n ?? 0;
  return {
    ...meta, // rank, category, counsellingType, seatType, states, courseId (populated), etc.
    filterOptions: {
      courses, // ["MD","MS",...] (empty for UG)
      states,
      types,
      branchesByCourse, // { MD: ["Anaes","Path",...], MS: [...] } (empty for UG)
    },
    counts, // { High, Medium, Low }
    isPG,
    totalRows,
     collegeCount, 
  };
};