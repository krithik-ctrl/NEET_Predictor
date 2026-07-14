import {
  getUserList,
} from "../../services/user-list.service.js";

import {
  getAdminList,
} from "../../services/admin-list.service.js";

import { mergePdfUsers } from "./merge-pdf-users.service.js";

import { pdfFilterUsers } from "./pdf-filter.service.js";




export const preparePdfData =
  async (query) => {

    const {

  exportType = "filtered",

  userIds = [],

  search,

  role,

  status,

  verified,

  profileCompleted,

  plan,

  sortBy,

  sortOrder,

} = query;




/*
|--------------------------------------------------------------------------
| Load Users
|--------------------------------------------------------------------------
*/

const [

  studentData,

  adminData,

] = await Promise.all([

  getUserList(),

  getAdminList(),

]);



const mergedData =
  mergePdfUsers({

    students: studentData,

    admins: adminData,

    counsellors: [],

  });

console.log(
  "Merged:",
  mergedData.users.length
);

let users =
  [...mergedData.users];

switch (exportType) {

  case "students":

    users =
      users.filter(
        (user) =>
          user.role ===
          "student"
      );

    break;

  case "admins":

    users =
      users.filter(
        (user) =>
          user.role ===
            "admin" ||
          user.role ===
            "sub-admin"
      );

    break;

  case "selected":

    users =
      users.filter(
        (user) =>
          userIds.includes(
            String(user.id)
          )
      );

    break;

  case "all":

    break;

  case "filtered":

  default:

    break;

}


console.log("before Filtered:", users.length);
console.log("before Filtered:", users);
/*
|--------------------------------------------------------------------------
| Apply Filters
|--------------------------------------------------------------------------
*/
const filteredData =
  pdfFilterUsers(
    users,
    query
  );

users =
  filteredData.users;
console.log("Filtered:", users.length);


const statistics = {
  totalUsers: users.length,

  students: users.filter(
    user => user.role === "student"
  ).length,

  superAdmins: users.filter(
    user => user.role === "admin"
  ).length,

  subAdmins: users.filter(
    user => user.role === "sub-admin"
  ).length,

  totalAdmins: users.filter(
    user =>
      user.role === "admin" ||
      user.role === "sub-admin"
  ).length,

  activeUsers: users.filter(
    user => user.status === "active"
  ).length,

  inactiveUsers: users.filter(
    user => user.status !== "active"
  ).length,

  verifiedUsers: users.filter(
    user => user.isVerified
  ).length,

  unverifiedUsers: users.filter(
    user => !user.isVerified
  ).length,

  premiumUsers: users.filter(
    user => user.plan !== "-" &&
            user.plan !== "Free"
  ).length,

  freeUsers: users.filter(
    user =>
      user.plan === "-" ||
      user.plan === "Free"
  ).length,
};

  /*
|--------------------------------------------------------------------------
| Sorting
|--------------------------------------------------------------------------
*/

const sortField =
  sortBy || "joinedDate";

users.sort((a, b) => {

  const first =
    a[sortField];

  const second =
    b[sortField];

  if (first < second) {
    return sortOrder === "asc"
      ? -1
      : 1;
  }

  if (first > second) {
    return sortOrder === "asc"
      ? 1
      : -1;
  }

  return 0;

});


/*
|--------------------------------------------------------------------------
| Export Information
|--------------------------------------------------------------------------
*/

const metadata = {

  generatedAt:
    new Date(),

 totalRecords:
  filteredData.totalRecords,

  appliedFilters: {

    exportType,

    search,

    role,

    status,

    verified,

    profileCompleted,

    plan,

  },

};


/*
|--------------------------------------------------------------------------
| Return
|--------------------------------------------------------------------------
*/

return {

  metadata,

  users,
statistics
};

  };