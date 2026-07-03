import { ChoiceList } from "../../choice-list/choiceList.model.js";
import { ChoiceListItem } from "../../choice-list/choiceListItem.model.js";

export const getChoiceListDashboard =
  async (userId) => {

    if (!userId) {
      throw new Error(
        "User ID is required"
      );
    }

    const choiceLists =
      await ChoiceList.find({
        userId,
      })
        .select(
          "_id name status createdAt"
        )
        .lean();

    const choiceListIds =
      choiceLists.map(
        (list) => list._id
      );

    const choiceListColleges =
      await ChoiceListItem.countDocuments({
        choiceListId: {
          $in: choiceListIds,
        },
      });

    return {

      choiceLists:
        choiceLists.length,

      choiceListColleges,

      recentChoiceLists:
        choiceLists
          .sort(
            (a, b) =>
              b.createdAt -
              a.createdAt
          )
          .slice(0, 3)
          .map((list) => ({

            id:
              list._id,

            name:
              list.name,

            status:
              list.status,

            createdAt:
              list.createdAt,

          })),

    };

  };