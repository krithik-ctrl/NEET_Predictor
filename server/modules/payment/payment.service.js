import mongoose from "mongoose";

import { Payment }
from "./payment.model.js";

import { Plan }
from "../plans/plan.model.js";

export const createPayment =
  async (
    userId,
    planId
  ) => {

    if (!userId) {
      throw new Error(
        "User ID is required"
      );
    }

    if (
      !mongoose.Types.ObjectId.isValid(
        planId
      )
    ) {
      throw new Error(
        "Invalid plan ID"
      );
    }

    const plan =
      await Plan.findById(
        planId
      );

    if (!plan) {
      throw new Error(
        "Plan not found"
      );
    }

    return await Payment.create({

      userId,

      planId,

      amount:
        plan.price,

      currency:
        "INR",

      status:
        "pending",

      paymentProvider:
        "razorpay",

    });

  };

export const getMyPayments =
  async (userId) => {

    if (!userId) {
      throw new Error(
        "User ID is required"
      );
    }

    return await Payment.find({

      userId,

    })
      .populate(
        "planId"
      )
      .sort({
        createdAt: -1,
      });

  };

export const getAllPayments =
  async () => {

    return await Payment.find()

      .populate(
        "userId",
        "name email"
      )

      .populate(
        "planId"
      )

      .sort({
        createdAt: -1,
      });

  };

export const getPaymentById =
  async (
    paymentId
  ) => {

    if (
      !mongoose.Types.ObjectId.isValid(
        paymentId
      )
    ) {
      throw new Error(
        "Invalid payment ID"
      );
    }

    const payment =
      await Payment.findById(
        paymentId
      )

        .populate(
          "userId",
          "name email"
        )

        .populate(
          "planId"
        );

    if (!payment) {
      throw new Error(
        "Payment not found"
      );
    }

    return payment;

  };

export const updatePaymentStatus =
  async (
    paymentId,
    status
  ) => {

    if (
      !mongoose.Types.ObjectId.isValid(
        paymentId
      )
    ) {
      throw new Error(
        "Invalid payment ID"
      );
    }

    const payment =
      await Payment.findById(
        paymentId
      );

    if (!payment) {
      throw new Error(
        "Payment not found"
      );
    }

    payment.status =
      status;

    if (
      status ===
      "success"
    ) {

      payment.paidAt =
        new Date();

    }

    await payment.save();

    return payment;

  };