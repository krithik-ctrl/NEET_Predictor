import { Admin } from "../admin/admin.model.js";

import {
  logAdminActivity,
  getAdminActivity,
} from "../admin-activity/adminActivity.service.js";

const ADMIN_ROLES = [
  "admin",
  "sub-admin",
  "super-admin",
];

const toAdminSummary = (admin) => ({
  id: admin._id,
  firstName: admin.firstName,
  lastName: admin.lastName,
  email: admin.email,
  mobile: admin.mobile,
  role: admin.role,
  isActive: admin.isActive,
  isVerified: admin.isVerified,
  lastLogin: admin.lastLogin,
  createdAt: admin.createdAt,

  createdBy:
    admin.createdBy && admin.createdBy.firstName
      ? {
          id: admin.createdBy._id,
          name: `${admin.createdBy.firstName} ${admin.createdBy.lastName}`,
        }
      : admin.createdBy || null,
});

/*
|--------------------------------------------------------------------------
| List Admins / Sub-Admins / Super-Admins
|--------------------------------------------------------------------------
*/

export const listAdmins = async ({
  role,
  status,
  search,
  page = 1,
  limit = 10,
} = {}) => {
  const query = {};

  if (role) {
    query.role = role;
  }

  if (status === "active") {
    query.isActive = true;
  } else if (status === "inactive") {
    query.isActive = false;
  }

  if (search) {
    query.$text = { $search: search };
  }

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limitNum = Math.max(parseInt(limit, 10) || 10, 1);
  const skip = (pageNum - 1) * limitNum;

  const [admins, total] = await Promise.all([
    Admin.find(query)
      .select("-password")
      .populate("createdBy", "firstName lastName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),

    Admin.countDocuments(query),
  ]);

  return {
    admins: admins.map(toAdminSummary),
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
    },
  };
};

/*
|--------------------------------------------------------------------------
| Get One Admin + Their Recent Activity
|--------------------------------------------------------------------------
*/

export const getAdminWithActivity = async (adminId) => {
  const admin = await Admin.findById(adminId)
    .select("-password")
    .populate("createdBy", "firstName lastName")
    .lean();

  if (!admin) {
    const error = new Error("Admin not found.");
    error.status = 404;
    throw error;
  }

  const activity = await getAdminActivity({
    adminId,
  });

  return {
    admin: toAdminSummary(admin),
    activity: activity.logs,
    activityPagination: activity.pagination,
  };
};

/*
|--------------------------------------------------------------------------
| Guards
|--------------------------------------------------------------------------
*/

const assertNotSelf = (actor, targetAdminId) => {
  if (
    String(actor.adminId) ===
    String(targetAdminId)
  ) {
    const error = new Error(
      "You cannot change your own role or status here."
    );
    error.status = 400;
    throw error;
  }
};

const getTargetAdmin = async (targetAdminId) => {
  const admin = await Admin.findById(
    targetAdminId
  );

  if (!admin) {
    const error = new Error("Admin not found.");
    error.status = 404;
    throw error;
  }

  return admin;
};

const assertNotLastActiveSuperAdmin = async (
  admin,
  { willBeActive, willBeRole } = {}
) => {
  if (admin.role !== "super-admin") return;

  const nextActive =
    willBeActive !== undefined
      ? willBeActive
      : admin.isActive;

  const nextRole =
    willBeRole !== undefined
      ? willBeRole
      : admin.role;

  const isLosingSuperAdminStatus =
    nextRole !== "super-admin" ||
    nextActive === false;

  if (!isLosingSuperAdminStatus) return;

  const otherActiveSuperAdmins =
    await Admin.countDocuments({
      role: "super-admin",
      isActive: true,
      _id: { $ne: admin._id },
    });

  if (otherActiveSuperAdmins === 0) {
    const error = new Error(
      "Cannot demote or deactivate the last active super-admin."
    );
    error.status = 400;
    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Promote / Demote (Role Change)
|--------------------------------------------------------------------------
*/

export const changeAdminRole = async (
  targetAdminId,
  role,
  actor,
  req
) => {
  if (!ADMIN_ROLES.includes(role)) {
    const error = new Error(
      `role must be one of: ${ADMIN_ROLES.join(", ")}.`
    );
    error.status = 400;
    throw error;
  }

  assertNotSelf(actor, targetAdminId);

  const admin = await getTargetAdmin(
    targetAdminId
  );

  await assertNotLastActiveSuperAdmin(admin, {
    willBeRole: role,
  });

  const from = admin.role;
  admin.role = role;
  await admin.save();

  await logAdminActivity({
    actorId: actor.adminId,
    actorRole: actor.role,
    action: "role_change",
    targetAdminId,
    meta: { from, to: role },
    req,
  });

  return toAdminSummary(admin.toObject());
};

/*
|--------------------------------------------------------------------------
| Activate / Deactivate
|--------------------------------------------------------------------------
*/

export const changeAdminStatus = async (
  targetAdminId,
  isActive,
  actor,
  req
) => {
  if (typeof isActive !== "boolean") {
    const error = new Error(
      "isActive must be a boolean."
    );
    error.status = 400;
    throw error;
  }

  assertNotSelf(actor, targetAdminId);

  const admin = await getTargetAdmin(
    targetAdminId
  );

  await assertNotLastActiveSuperAdmin(admin, {
    willBeActive: isActive,
  });

  admin.isActive = isActive;
  await admin.save();

  await logAdminActivity({
    actorId: actor.adminId,
    actorRole: actor.role,
    action: isActive ? "activate" : "deactivate",
    targetAdminId,
    meta: {},
    req,
  });

  return toAdminSummary(admin.toObject());
};

/*
|--------------------------------------------------------------------------
| Activity Feed
|--------------------------------------------------------------------------
*/

export const listAdminActivity = async ({
  adminId,
  action,
  page,
  limit,
} = {}) => {
  return await getAdminActivity({
    adminId,
    action,
    page,
    limit,
  });
};
