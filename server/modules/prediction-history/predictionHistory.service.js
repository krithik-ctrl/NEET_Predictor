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
