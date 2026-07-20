import { PredictionHistory } from "../../../prediction-history/predictionHistory.model.js";
import { User } from "../../../users/user.model.js";
import { Course } from "../../../courses/course.model.js";

export const getPredictionOverview = async () => {
  const [totalPredictions, recentPredictions] =
    await Promise.all([
      PredictionHistory.countDocuments(),

      PredictionHistory.aggregate([
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
            from: Course.collection.name,
            localField: "courseId",
            foreignField: "_id",
            as: "course",
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
            path: "$course",
            preserveNullAndEmptyArrays: true,
          },
        },

        {
          $project: {
            _id: 0,

            studentName: {
              $concat: [
                "$user.firstName",
                " ",
                "$user.lastName",
              ],
            },

            course: "$course.name",

            rank: {
              $ifNull: [
                "$predictedColleges.0.studentRank",
                "-"
              ],
            },

            result: {
              $concat: [
                {
                  $toString: "$totalResults",
                },
                " colleges",
              ],
            },

            date: "$createdAt",
          },
        },
      ]),
    ]);

  return {
    predictions: {
      total: totalPredictions,
    },

    recentPredictions,
  };
};