import mongoose from "mongoose";

const paymentSchema =
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

      amount: {
        type: Number,
        required: true, // this is the FINAL amount (base + GST) charged to the user
      },

      baseAmount: {
        type: Number,
        default: null, // plan price before GST
      },

      gstAmount: {
        type: Number,
        default: null, // 18% GST amount
      },

      currency: {
        type: String,
        default: "INR",
      },

      status: {
        type: String,
        enum: [
          "pending",
          "success",
          "failed",
          "cancelled",
        ],
        default: "pending",
      },

      paymentProvider: {
        type: String,
        default: "razorpay",
      },

      orderId: {
        type: String,
        default: null,
      },

      paymentId: {
        type: String,
        default: null,
      },

      signature: {
        type: String,
        default: null,
      },

      paidAt: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
    }
  );

export const Payment =
  mongoose.model(
    "Payment",
    paymentSchema
  );