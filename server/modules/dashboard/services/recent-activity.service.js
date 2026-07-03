import { PredictionHistory } from "../../prediction-history/predictionHistory.model.js";
import { SavedCollege } from "../../saved-colleges/savedCollege.model.js";
import { ChoiceList } from "../../choice-list/choiceList.model.js";

export const getRecentActivity =
  async (
    userId,
    limit = 10
  ) => {

    if (!userId) {
      throw new Error(
        "User ID is required"
      );
    }

    const [
      predictions,
      savedColleges,
      choiceLists,
    ] = await Promise.all([

      PredictionHistory.find({
        userId,
      })
        .populate(
          "courseId",
          "name"
        )
        .sort({
          createdAt: -1,
        })
        .limit(limit)
        .lean(),

      SavedCollege.find({
        userId,
      })
        .populate(
          "collegeId",
          "name state city ownership"
        )
        .sort({
          createdAt: -1,
        })
        .limit(limit)
        .lean(),

      ChoiceList.find({
        userId,
      })
        .sort({
          createdAt: -1,
        })
        .limit(limit)
        .lean(),

    ]);

    const activities = [];

    for (const prediction of predictions) {

      activities.push({

        id:
          prediction._id,

        type:
          "prediction",

        title:
          `Generated ${prediction.courseId?.name} prediction`,

        description:
          `${prediction.totalResults} colleges matched`,

        createdAt:
          prediction.createdAt,

      });

    }

    for (const college of savedColleges) {

      activities.push({

        id:
          college._id,

        type:
          "savedCollege",

        title:
          `Saved ${college.collegeId?.name}`,

        description:
          "College added to saved list",

        createdAt:
          college.createdAt,

      });

    }

    for (const list of choiceLists) {

      activities.push({

        id:
          list._id,

        type:
          "choiceList",

        title:
          `Updated "${list.name}"`,

        description:
          "Choice list modified",

        createdAt:
          list.updatedAt,

      });

    }

    activities.sort(
      (a, b) =>
        new Date(
          b.createdAt
        ) -
        new Date(
          a.createdAt
        )
    );

    return {

      totalActivities:
        activities.length,

      recentActivity:
        activities.slice(
          0,
          limit
        ),

    };

  };