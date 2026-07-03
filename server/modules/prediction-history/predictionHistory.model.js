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

      round: {
  type: String,
  required: false,
  default: null,
},

      counsellingType: {
        type: String,
        required: true,
        trim: true,
      },

      predictorState: {
        type: String,
        trim: true,
        default: null,
      },

      domicileState: {
        type: String,
        trim: true,
        default: null,
      },

      seatType: {
        type: String,
        required: true,
        trim: true,
      },

      category: {
        type: String,
        required: true,
        trim: true,
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

/*
|--------------------------------------------------------------------------
| Search History Index
|--------------------------------------------------------------------------
*/

predictionHistorySchema.index({
  userId: 1,
  createdAt: -1,
});

export const PredictionHistory =
  mongoose.model(
    "PredictionHistory",
    predictionHistorySchema
  );