import {
  createPayment,
  getMyPayments,
  getAllPayments,
  getPaymentById,
  updatePaymentStatus,
   verifyPayment,
} from "./payment.service.js";

import {
  createPaymentSchema,
  updatePaymentStatusSchema,
    verifyPaymentSchema,
} from "./payment.validation.js";




export const createPaymentController =
  async (req, res, next) => {
    try {

      const data =
        createPaymentSchema.parse(
          req.body
        );

      const payment =
        await createPayment(
          req.user.userId,
          data.planId
        );

      res.status(201).json({
        success: true,
        message:
          "Payment created successfully",
        data: payment,
      });

    } catch (error) {
      next(error);
    }
  };

export const getMyPaymentsController =
  async (req, res, next) => {
    try {

      const payments =
        await getMyPayments(
          req.user.userId
        );

      res.status(200).json({
        success: true,
        data: payments,
      });

    } catch (error) {
      next(error);
    }
  };

export const getAllPaymentsController =
  async (req, res, next) => {
    try {

      const payments =
        await getAllPayments();

      res.status(200).json({
        success: true,
        data: payments,
      });

    } catch (error) {
      next(error);
    }
  };

export const getPaymentByIdController =
  async (req, res, next) => {
    try {

      const payment =
        await getPaymentById(
          req.params.id
        );

      res.status(200).json({
        success: true,
        data: payment,
      });

    } catch (error) {
      next(error);
    }
  };

export const updatePaymentStatusController =
  async (req, res, next) => {
    try {

      const data =
        updatePaymentStatusSchema.parse(
          req.body
        );

      const payment =
        await updatePaymentStatus(
          req.params.id,
          data.status
        );

      res.status(200).json({
        success: true,
        message:
          "Payment status updated successfully",
        data: payment,
      });

    } catch (error) {
      next(error);
    }
  };


  export const verifyPaymentController =
  async (req, res, next) => {

    try {

      const data =
        verifyPaymentSchema.parse(
          req.body
        );

      const payment =
        await verifyPayment(
          data
        );

      res.status(200).json({

        success: true,

        message:
          "Payment verified successfully",

        data: payment,

      });

    } catch (error) {

      next(error);

    }

  };