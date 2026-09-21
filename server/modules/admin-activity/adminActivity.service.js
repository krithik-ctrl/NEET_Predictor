import { AdminActivityLog } from "./adminActivity.model.js";

/*
|--------------------------------------------------------------------------
| Log Admin Activity (fire-and-forget — never throws)
|--------------------------------------------------------------------------
*/

export async function logAdminActivity({
  actorId,
  actorRole = null,
  action,
  targetAdminId = null,
  meta = {},
  req = null,
}) {
  try {
    const forwardedFor =
      req?.headers?.["x-forwarded-for"];

    const ip =
      (forwardedFor
        ? forwardedFor.split(",")[0].trim()
        : req?.ip) || null;

    const userAgent =
      req?.headers?.["user-agent"] || null;

    await AdminActivityLog.create({
      actorId,
      actorRole,
      action,
      targetAdminId,
      meta,
      ip,
      userAgent,
    });
  } catch (error) {
    console.error(
      "Failed to log admin activity:",
      error
    );
  }
}

/*
|--------------------------------------------------------------------------
| Get Admin Activity (paginated, newest first)
|--------------------------------------------------------------------------
*/

export const getAdminActivity = async ({
  adminId,
  action,
  page = 1,
  limit = 20,
} = {}) => {
  const query = {};

  if (adminId) {
    query.$or = [
      { actorId: adminId },
      { targetAdminId: adminId },
    ];
  }

  if (action) {
    query.action = action;
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 20, 1);
  const skip = (pageNum - 1) * limitNum;

  const [logs, total] = await Promise.all([
    AdminActivityLog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate("actorId", "firstName lastName role")
      .populate("targetAdminId", "firstName lastName role")
      .lean(),

    AdminActivityLog.countDocuments(query),
  ]);

  const data = logs.map((log) => ({
    id: log._id,
    action: log.action,

    actor: log.actorId
      ? {
          id: log.actorId._id,
          name: `${log.actorId.firstName} ${log.actorId.lastName}`,
          role: log.actorId.role,
        }
      : null,

    actorRole: log.actorRole,

    target: log.targetAdminId
      ? {
          id: log.targetAdminId._id,
          name: `${log.targetAdminId.firstName} ${log.targetAdminId.lastName}`,
          role: log.targetAdminId.role,
        }
      : null,

    meta: log.meta,
    ip: log.ip,
    userAgent: log.userAgent,
    createdAt: log.createdAt,
  }));

  return {
    logs: data,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
    },
  };
};
