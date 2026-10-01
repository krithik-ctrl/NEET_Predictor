import { User } from "../../../users/user.model.js";
import { StudentProfile } from "../../../student-profile/studentProfile.model.js";
import { SavedCollege } from "../../../saved-colleges/savedCollege.model.js";
import { ChoiceList } from "../../../choice-list/choiceList.model.js";
import { ChoiceListItem } from "../../../choice-list/choiceListItem.model.js";
import { Subscription } from "../../../subscription/subscription.model.js";
import { PredictionHistory } from "../../../prediction-history/predictionHistory.model.js";
import {
  parseBulkIds,
  markNotFound,
} from "../../../../common/utils/bulkDelete.js";

/*
|--------------------------------------------------------------------------
| Hard Delete Students (permanent, with cascade)
|--------------------------------------------------------------------------
|
| Removes the users AND their predictionhistories, savedcolleges,
| choicelists (+ their choicelistitems), studentprofile and subscriptions.
| Payments are intentionally KEPT (financial/audit record — ADMIN_V2
| decision 1).
|
| Dependents are removed before the users, so a failure part-way leaves
| the user in place and the delete can simply be retried.
|
*/

const hardDeleteStudents =
  async (userIds) => {

    const choiceLists =
      await ChoiceList.find(
        { userId: { $in: userIds } },
        { _id: 1 }
      ).lean();

    const choiceListIds =
      choiceLists.map((list) => list._id);

    const [
      predictionHistories,
      savedColleges,
      choiceListItems,
      studentProfiles,
      subscriptions,
    ] = await Promise.all([
      PredictionHistory.deleteMany({ userId: { $in: userIds } }),
      SavedCollege.deleteMany({ userId: { $in: userIds } }),
      ChoiceListItem.deleteMany({ choiceListId: { $in: choiceListIds } }),
      StudentProfile.deleteMany({ userId: { $in: userIds } }),
      Subscription.deleteMany({ userId: { $in: userIds } }),
    ]);

    const choiceListsResult =
      await ChoiceList.deleteMany({ _id: { $in: choiceListIds } });

    const usersResult =
      await User.deleteMany({ _id: { $in: userIds } });

    return {
      deletedCount: usersResult.deletedCount,
      cascade: {
        predictionHistories: predictionHistories.deletedCount,
        savedColleges: savedColleges.deletedCount,
        choiceLists: choiceListsResult.deletedCount,
        choiceListItems: choiceListItems.deletedCount,
        studentProfiles: studentProfiles.deletedCount,
        subscriptions: subscriptions.deletedCount,
      },
    };

  };

/*
|--------------------------------------------------------------------------
| Single Student Delete
|--------------------------------------------------------------------------
*/

export const deleteStudent =
  async (userId) => {

    const { validIds } =
      parseBulkIds({ ids: [userId] });

    const user =
      validIds.length
        ? await User.findById(userId, { _id: 1 }).lean()
        : null;

    if (!user) {
      const error = new Error(
        "Student not found."
      );
      error.status = 404;
      throw error;
    }

    const { cascade } =
      await hardDeleteStudents([user._id]);

    return {
      id: user._id,
      deleted: true,
      cascade,
    };

  };

/*
|--------------------------------------------------------------------------
| Bulk Student Delete (max 100)
|--------------------------------------------------------------------------
*/

export const bulkDeleteStudents =
  async (body) => {

    const { validIds, skipped, requested } =
      parseBulkIds(body);

    const existing =
      validIds.length
        ? await User.find(
            { _id: { $in: validIds } },
            { _id: 1 }
          ).lean()
        : [];

    const existingIds =
      existing.map((user) => user._id);

    markNotFound(validIds, existingIds, skipped);

    if (!existingIds.length) {
      return {
        deletedCount: 0,
        requested,
        skipped,
        cascade: null,
      };
    }

    const { deletedCount, cascade } =
      await hardDeleteStudents(existingIds);

    return {
      deletedCount,
      requested,
      skipped,
      cascade,
      deletedIds: existingIds,
    };

  };
