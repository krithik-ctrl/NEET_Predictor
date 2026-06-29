import { User }
from "../users/user.model.js";

import { College }
from "../colleges/college.model.js";

import { Course }
from "../courses/course.model.js";

import { Cutoff }
from "../cutoffs/cutoff.model.js";

import { PredictionHistory }
from "../prediction-history/predictionHistory.model.js";

import { SavedCollege }
from "../saved-colleges/savedCollege.model.js";

import { ChoiceList }
from "../choice-list/choiceList.model.js";

import { Payment }
from "../payment/payment.model.js";

import { Subscription }
from "../subscription/subscription.model.js";

export const getAdminDashboard =
  async () => {

    const [

      totalUsers,

      totalStudents,

      totalCounsellors,

      totalAdmins,

      totalColleges,

      totalCourses,

      totalCutoffs,

      totalPredictions,

      totalSavedColleges,

      totalChoiceLists,

      totalPayments,

      successfulPayments,

      pendingPayments,

      failedPayments,

      cancelledPayments,

      freeUsers,

      premiumUsers,

      latestUsers,

      latestPayments,

      latestPredictions,

      revenue,

    ] = await Promise.all([

      User.countDocuments(),

      User.countDocuments({
        role: "student",
      }),

      User.countDocuments({
        role: "counsellor",
      }),

      User.countDocuments({
        role: "admin",
      }),

      College.countDocuments(),

      Course.countDocuments(),

      Cutoff.countDocuments(),

      PredictionHistory.countDocuments(),

      SavedCollege.countDocuments(),

      ChoiceList.countDocuments(),

      Payment.countDocuments(),

      Payment.countDocuments({
        status: "success",
      }),

      Payment.countDocuments({
        status: "pending",
      }),

      Payment.countDocuments({
        status: "failed",
      }),

      Payment.countDocuments({
        status: "cancelled",
      }),
     Subscription.countDocuments({
  status: "active",
  endDate: null,
}),
      Subscription.countDocuments({
  status: "active",
  endDate: {
    $ne: null,
  },
}),
      User.find()
        .select(
          "name email role createdAt"
        )
        .sort({
          createdAt: -1,
        })
        .limit(5),

      Payment.find()
        .populate(
          "userId",
          "name email"
        )
        .populate(
          "planId",
          "name"
        )
        .sort({
          createdAt: -1,
        })
        .limit(5),

      PredictionHistory.find()
        .populate(
          "courseId",
          "name"
        )
        .sort({
          createdAt: -1,
        })
        .limit(5),

      Payment.aggregate([
        {
          $match: {
            status: "success",
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$amount",
            },
          },
        },
      ]),

    ]);

    return {

      overview: {

        totalUsers,

        totalStudents,

        totalCounsellors,

        totalAdmins,

        totalColleges,

        totalCourses,

        totalCutoffs,

      },

      subscriptions: {

        freeUsers:
          totalStudents -
          premiumUsers,

        premiumUsers,

      },

      payments: {

        totalPayments,

        successfulPayments,

        pendingPayments,

        failedPayments,

        cancelledPayments,

        totalRevenue:
          revenue.length
            ? revenue[0].total
            : 0,

      },

      activity: {

        totalPredictions,

        totalSavedColleges,

        totalChoiceLists,

      },

      recent: {

        users:
          latestUsers,

        payments:
          latestPayments,

        predictions:
          latestPredictions,

      },

    };

  };