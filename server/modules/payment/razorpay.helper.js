import Razorpay from "razorpay";

import crypto from "crypto";

const razorpay = new Razorpay({

  key_id: process.env.RAZORPAY_KEY_ID,

  key_secret: process.env.RAZORPAY_KEY_SECRET,

});

export const createRazorpayOrder = async (
  amount,
  currency = "INR"
) => {

  console.log("Creating Razorpay Order...");
  console.log("Amount:", amount);

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency,
    payment_capture: 1,
  });

  console.log("Razorpay Response:");
  console.log(order);

  return order;
};

export const verifyRazorpaySignature = ({
  orderId,
  paymentId,
  signature,
}) => {

  const body =
    `${orderId}|${paymentId}`;

  const expectedSignature =
    crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body)
      .digest("hex");

  return (
    expectedSignature ===
    signature
  );

};

export default razorpay;