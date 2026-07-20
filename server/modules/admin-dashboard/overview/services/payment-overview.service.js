import mongoose from "mongoose";

import { Payment } from "../../../payment/payment.model.js";
import { User } from "../../../users/user.model.js";
import { Plan } from "../../../plans/plan.model.js";

export const getPaymentOverview = async () => {
  const [paymentAnalytics, recentPayments] =
    await Promise.all([
      Payment.aggregate([
        {
          $group: {
            _id: null,

            total: {
              $sum: 1,
            },

            revenue: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "success",
                    ],
                  },
                  "$amount",
                  0,
                ],
              },
            },

            success: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "success",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },

            pending: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "pending",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },

            failed: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "failed",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },

            cancelled: {
              $sum: {
                $cond: [
                  {
                    $eq: [
                      "$status",
                      "cancelled",
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ]),

      Payment.aggregate([
        {
          $sort: {
            createdAt: -1,
          },
        },

        {
          $limit: 5,
        },

        {
          $lookup: {
            from: User.collection.name,
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },

        {
          $lookup: {
            from: Plan.collection.name,
            localField: "planId",
            foreignField: "_id",
            as: "plan",
          },
        },

        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $unwind: {
            path: "$plan",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $project: {
            _id: 1,

            userName: {
              $concat: [
                "$user.firstName",
                " ",
                "$user.lastName",
              ],
            },

            email: "$user.email",

            plan: "$plan.name",

            amount: 1,

            status: 1,

            paidAt: 1,

            createdAt: 1,
          },
        },
      ]),
    ]);

  const analytics =
    paymentAnalytics[0] || {};

  return {
    payments: {
      total:
        analytics.total || 0,

      revenue:
        analytics.revenue || 0,

      success:
        analytics.success || 0,

      pending:
        analytics.pending || 0,

      failed:
        analytics.failed || 0,

      cancelled:
        analytics.cancelled || 0,
    },

    recentPayments,
  };
};