import mongoose from "mongoose";

import { PredictionHistory } from "./predictionHistory.model.js";

export const createPredictionHistory =
  async (
    userId,
    payload
  ) => {

    if (!userId) {
      throw new Error(
        "User ID is required"
      );
    }

    return await PredictionHistory.create(
      {
        userId,
        ...payload,
      }
    );
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