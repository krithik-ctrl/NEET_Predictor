import mongoose from "mongoose";
import { logAdminActivity } from "../../modules/admin-activity/adminActivity.service.js";

/*
|--------------------------------------------------------------------------
| Bulk Delete — shared request contract (ADMIN_V2)
|--------------------------------------------------------------------------
|
| Request:  POST /<module>/bulk-delete   { "ids": ["<id>", ...] }  (max 100)
| Response: { success, deletedCount, requested, skipped }
|   - requested: number of ids received (after de-duplication)
|   - skipped:   [{ id, reason }] — reason is "invalid_id" or "not_found"
|
*/

export const BULK_DELETE_MAX = 100;

// Stricter than mongoose's isValid (which accepts any 12-char string).
const isObjectIdString = (id) =>
  /^[0-9a-fA-F]{24}$/.test(id) &&
  mongoose.Types.ObjectId.isValid(id);

export const parseBulkIds = (body) => {

  const ids = body?.ids;

  if (!Array.isArray(ids) || ids.length === 0) {
    const error = new Error(
      "`ids` must be a non-empty array."
    );
    error.status = 400;
    throw error;
  }

  const unique = [
    ...new Set(ids.map((id) => String(id).trim())),
  ];

  if (unique.length > BULK_DELETE_MAX) {
    const error = new Error(
      `Cannot delete more than ${BULK_DELETE_MAX} items at once.`
    );
    error.status = 400;
    throw error;
  }

  const validIds = [];
  const skipped = [];

  for (const id of unique) {
    if (isObjectIdString(id)) {
      validIds.push(id);
    } else {
      skipped.push({ id, reason: "invalid_id" });
    }
  }

  return {
    validIds,
    skipped,
    requested: unique.length,
  };

};

// Marks every valid id that wasn't actually found/deleted as "not_found".
export const markNotFound = (validIds, foundIds, skipped) => {

  const found = new Set(foundIds.map(String));

  for (const id of validIds) {
    if (!found.has(String(id))) {
      skipped.push({ id, reason: "not_found" });
    }
  }

  return skipped;

};

/*
|--------------------------------------------------------------------------
| Hard delete by ids — finds which ids exist, marks the rest "not_found",
| deletes the found ones. Returns { deletedCount, foundIds }.
|--------------------------------------------------------------------------
*/

export const hardDeleteByIds =
  async (Model, ids, skipped) => {

    const found =
      ids.length
        ? await Model.find(
            { _id: { $in: ids } },
            { _id: 1 }
          ).lean()
        : [];

    const foundIds =
      found.map((doc) => doc._id);

    markNotFound(ids, foundIds, skipped);

    if (!foundIds.length) {
      return { deletedCount: 0, foundIds };
    }

    const result =
      await Model.deleteMany({
        _id: { $in: foundIds },
      });

    return {
      deletedCount: result.deletedCount,
      foundIds,
    };

  };

/*
|--------------------------------------------------------------------------
| Express handler factory — one consistent bulk-delete endpoint.
|
| deleteFn(validIds, skipped, req) must push its own "not_found" (or other)
| entries into `skipped` and return { deletedCount, ...extra }. `extra`
| (e.g. warning, references, mode) is merged into the response, except
| `foundIds`, which is only used for the activity log.
|--------------------------------------------------------------------------
*/

export const bulkDeleteHandler =
  (deleteFn, { action } = {}) =>
  async (req, res, next) => {

    try {

      const { validIds, skipped, requested } =
        parseBulkIds(req.body);

      const {
        deletedCount,
        foundIds = [],
        ...extra
      } = await deleteFn(validIds, skipped, req);

      if (action && deletedCount > 0) {
        logAdminActivity({
          actorId: req.admin?.adminId,
          actorRole: req.admin?.role,
          action,
          targetAdminId: null,
          meta: { ids: foundIds, deletedCount },
          req,
        });
      }

      res.status(200).json({
        success: true,
        deletedCount,
        requested,
        skipped,
        ...extra,
      });

    } catch (error) {

      next(error);

    }

  };
