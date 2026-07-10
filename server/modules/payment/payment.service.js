import mongoose from "mongoose";
import {
  verifyRazorpaySignature,
} from "./razorpay.helper.js";
import {
  createRazorpayOrder,
} from "./razorpay.helper.js";
import { Payment }
from "./payment.model.js";

import { Plan }
from "../plans/plan.model.js";

import {activatePremiumSubscription} from "../subscription/subscription.helper.js"



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

    const razorpayOrder =
      await createRazorpayOrder(
        plan.price,
        "INR"
      );

    const payment =
      await Payment.create({

        userId,

        planId,

        amount: plan.price,

        currency: "INR",

        status: "pending",

        paymentProvider: "razorpay",

        orderId:
          razorpayOrder.id,

      });

    return {

      paymentId:
        payment._id,

      orderId:
        razorpayOrder.id,

      amount:
        razorpayOrder.amount,

      currency:
        razorpayOrder.currency,

      keyId:
      
        process.env.RAZORPAY_KEY_ID,

    };

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

  export const verifyPayment =
  async ({
    orderId,
    paymentId,
    signature,
  }) => {

    if (
      !orderId ||
      !paymentId ||
      !signature
    ) {

      throw new Error(
        "Payment verification data is required"
      );

    }

    const isValid =
      verifyRazorpaySignature({

        orderId,

        paymentId,

        signature,

      });

    if (!isValid) {

      throw new Error(
        "Invalid payment signature"
      );

    }

    const payment =
      await Payment.findOne({

        orderId,

      });

    if (!payment) {

      throw new Error(
        "Payment not found"
      );

    }
if (payment.status === "success") {
  return payment;
}
    payment.paymentId =
      paymentId;

    payment.signature =
      signature;

    payment.status =
      "success";

    payment.paidAt =
      new Date();

    await payment.save();
    await activatePremiumSubscription(
  payment.userId,
  payment.planId
);

    return payment;

  };