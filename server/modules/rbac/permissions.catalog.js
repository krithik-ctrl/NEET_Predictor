/*
|--------------------------------------------------------------------------
| Permission Catalog
|--------------------------------------------------------------------------
|
| Single source of truth for every `module.action` permission key the
| backend understands. See docs/rbac-catalog.md for the full route→
| permission map and the reasoning behind the role defaults below.
|
*/

export const PERMISSION_CATALOG = [
  // Colleges
  { key: "colleges.read", label: "View colleges", group: "Colleges" },
  { key: "colleges.create", label: "Create college", group: "Colleges" },
  { key: "colleges.update", label: "Update college", group: "Colleges" },
  { key: "colleges.delete", label: "Delete college", group: "Colleges" },

  // Cutoffs
  { key: "cutoffs.read", label: "View cutoffs", group: "Cutoffs" },
  { key: "cutoffs.create", label: "Create cutoff", group: "Cutoffs" },
  { key: "cutoffs.update", label: "Update cutoff", group: "Cutoffs" },
  { key: "cutoffs.delete", label: "Delete cutoff", group: "Cutoffs" },

  // Courses
  { key: "courses.read", label: "View courses", group: "Courses" },
  { key: "courses.create", label: "Create course", group: "Courses" },

  // Plans
  { key: "plans.read", label: "View plans", group: "Plans" },
  { key: "plans.create", label: "Create plan", group: "Plans" },
  { key: "plans.update", label: "Update plan", group: "Plans" },
  { key: "plans.delete", label: "Delete plan", group: "Plans" },

  // Subscriptions
  { key: "subscriptions.read", label: "View subscriptions", group: "Subscriptions" },
  { key: "subscriptions.create", label: "Create subscription", group: "Subscriptions" },
  { key: "subscriptions.update", label: "Update subscription", group: "Subscriptions" },
  { key: "subscriptions.delete", label: "Delete subscription", group: "Subscriptions" },

  // Payments
  { key: "payments.read", label: "View payment details", group: "Payments" },
  { key: "payments.update_status", label: "Update payment status", group: "Payments" },

  // Admin Users (managing admin/sub-admin accounts + the merged user list)
  { key: "users.read", label: "View merged user list (students, admins, counsellors)", group: "Admin Users" },
  { key: "admin_users.read", label: "View one admin's details", group: "Admin Users" },
  { key: "admin_users.create", label: "Create an admin/sub-admin account", group: "Admin Users" },
  { key: "admin_users.update", label: "Update an admin/sub-admin account", group: "Admin Users" },
  { key: "admin_users.delete", label: "Delete an admin/sub-admin account", group: "Admin Users" },

  // Students
  { key: "students.read", label: "View a student's details", group: "Students" },
  { key: "students.delete", label: "Deactivate (soft-delete) a student", group: "Students" },

  // Reports
  { key: "reports.export", label: "Export users to PDF/Excel", group: "Reports" },

  // Prediction History
  { key: "prediction_history.read", label: "View admin prediction history", group: "Prediction History" },

  // Predictor
  { key: "predictor.use", label: "Run the admin college predictor", group: "Predictor" },

  // Dashboard
  { key: "dashboard.read", label: "View the admin dashboard overview", group: "Dashboard" },

  // Admin Management — these routes are already hard-gated by requireSuperAdmin
  // (not by requirePermission), so these keys exist for catalog/UI completeness
  // (showing what "ALL" covers) rather than active enforcement.
  { key: "admin_management.view", label: "View admins & sub-admins list/detail", group: "Admin Management" },
  { key: "admin_management.manage_roles", label: "Promote/demote an admin's role", group: "Admin Management" },
  { key: "admin_management.manage_status", label: "Activate/deactivate an admin", group: "Admin Management" },
  { key: "admin_management.manage_permissions", label: "Edit an admin's permission set", group: "Admin Management" },
  { key: "admin_management.activity", label: "View the admin activity log", group: "Admin Management" },
];

const ALL_KEYS = PERMISSION_CATALOG.map(
  (permission) => permission.key
);

/*
|--------------------------------------------------------------------------
| Role Defaults
|--------------------------------------------------------------------------
|
| These reproduce CURRENT behavior exactly (see docs/rbac-catalog.md §3):
|   - super-admin: always full access (also see the requirePermission /
|     authorizeAdmin role bypasses, which don't even consult this array).
|   - admin: today's `authorizeAdmin("admin")` gate already grants every
|     one of these actions, so the default is every catalog key.
|   - sub-admin: only the three things a sub-admin can do today
|     (predictor, prediction history, dashboard overview). Content CRUD,
|     admin-user management, subscriptions, payments, exports and reports
|     are admin-only today and are therefore NOT in this default.
|
*/

export const ROLE_DEFAULTS = {
  "super-admin": ALL_KEYS,
  "admin": ALL_KEYS,
  "sub-admin": [
    "prediction_history.read",
    "predictor.use",
    "dashboard.read",
  ],
};

/*
|--------------------------------------------------------------------------
| Effective Permissions
|--------------------------------------------------------------------------
|
| null/unset Admin.permissions ("not customized") falls back to the role
| default. A super-admin's Admin.permissions can never actually be set to
| an array (the PATCH endpoint rejects that — see adminManagement.service.js),
| so a super-admin always resolves to ROLE_DEFAULTS["super-admin"] (= ALL)
| in practice.
|
*/

export const getEffectivePermissions = (adminDoc) => {
  if (Array.isArray(adminDoc?.permissions)) {
    return adminDoc.permissions;
  }

  return ROLE_DEFAULTS[adminDoc?.role] || [];
};
