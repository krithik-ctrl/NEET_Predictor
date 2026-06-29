import mongoose from "mongoose";

const subscriptionSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
        required: true,
      },

      startDate: {
        type: Date,
        required: true,
        default: Date.now,
      },

      endDate: {
        type: Date,
        default: null,
      },

      status: {
        type: String,
        enum: [
          "active",
          "expired",
          "cancelled",
        ],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

export const Subscription =
  mongoose.model(
    "Subscription",
    subscriptionSchema
  );