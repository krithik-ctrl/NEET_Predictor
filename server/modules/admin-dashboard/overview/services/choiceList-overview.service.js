import { ChoiceList } from "../../../choice-list/choiceList.model.js";
import { ChoiceListItem } from "../../../choice-list/choiceListItem.model.js";

export const getChoiceListOverview =
  async () => {
    const [
      totalChoiceLists,
      activeChoiceLists,
      archivedChoiceLists,
      totalChoiceListItems,
    ] = await Promise.all([
      ChoiceList.countDocuments(),

      ChoiceList.countDocuments({
        status: "active",
      }),

      ChoiceList.countDocuments({
        status: "archived",
      }),

      ChoiceListItem.countDocuments(),
    ]);

    return {
      choiceLists: {
        total: totalChoiceLists,
        active: activeChoiceLists,
        archived: archivedChoiceLists,
        totalItems: totalChoiceListItems,
      },
    };
  };