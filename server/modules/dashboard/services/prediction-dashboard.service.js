import { PredictionHistory } from "../../prediction-history/predictionHistory.model.js";

import {
  countTodayPredictions,
} from "../../prediction-history/predictionHistory.service.js";

export const getPredictionDashboard =
  async (userId) => {

    if (!userId) {
      throw new Error(
        "User ID is required"
      );
    }

    const [
      predictionCount,
      predictionsToday,
      latestPredictions,
    ] = await Promise.all([

      PredictionHistory.countDocuments({
        userId,
      }),

      countTodayPredictions(
        userId
      ),

      PredictionHistory.find({
        userId,
      })
        .populate(
          "courseId",
          "name"
        )
        .sort({
          createdAt: -1,
        })
        .limit(3)
        .lean(),

    ]);

    return {

      predictionCount,

      predictionsToday,

      latestPredictions:
        latestPredictions.map(
          (prediction) => ({

            id:
              prediction._id,

            course:
              prediction.courseId
                ?.name,

            rank:
              prediction.rank,

            counsellingType:
              prediction.counsellingType,

            predictorState:
              prediction.predictorState,

            domicileState:
              prediction.domicileState,

            seatType:
              prediction.seatType,

            category:
              prediction.category,

            round:
              prediction.round,

            totalResults:
              prediction.totalResults,

            safeCount:
              prediction.safeCount,

            moderateCount:
              prediction.moderateCount,

            riskyCount:
              prediction.riskyCount,

            generatedAt:
              prediction.generatedAt,

          })
        ),

    };

  };