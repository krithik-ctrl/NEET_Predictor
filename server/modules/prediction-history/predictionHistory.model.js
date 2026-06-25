import mongoose from "mongoose";

const predictionHistorySchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },

      rank: {
        type: Number,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      quota: {
        type: String,
        required: true,
      },

      totalResults: {
        type: Number,
        default: 0,
      },

      safeCount: {
        type: Number,
        default: 0,
      },

      moderateCount: {
        type: Number,
        default: 0,
      },

      riskyCount: {
        type: Number,
        default: 0,
      },

      generatedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

export const PredictionHistory =
  mongoose.model(
    "PredictionHistory",
    predictionHistorySchema
  );