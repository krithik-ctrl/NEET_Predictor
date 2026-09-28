

import {
  getUserStatistics,
} from "./services/user-statistics.service.js";

import {
  getUserList,
} from "./services/user-list.service.js";

import {
  getAdminList,
} from "./services/admin-list.service.js";

import {
  getCounsellorList,
} from "./services/counsellor-list.service.js";

import {
  mergeUsers,
} from "./services/merge-users.service.js";

import {
  filterUsers,
} from "./services/filter-users.service.js";



export const getAdminUsers =
  async (queryParams) => {

    const {

      page = 1,

      limit = 10,

      search,

      role,

      plan,

      status,

      verified,

      profileCompleted,

      sortBy = "createdAt",

      sortOrder = "desc",

    } = queryParams;


// USERS_001 quick win — narrow the DB read to what search/role/status/
// verified already imply, instead of loading every student/admin on every
// request. `plan`/`profileCompleted` still need joined data, so filterUsers()
// below still applies the full filter set — this is a safe, redundant-but-
// harmless re-check over an already-narrowed set, not a behavior change.
const dbFilter = {

  search,

  role,

  status,

  verified,

};

const [

  statistics,

  students,

  admins,

  counsellors,

] = await Promise.all([

  getUserStatistics(),

  getUserList(dbFilter),

  getAdminList(dbFilter),

  getCounsellorList(),

]);


const mergedUsers =
  mergeUsers({

    students,

    admins,

    counsellors,

  });


const users =
  filterUsers(

    mergedUsers,

    {

      page,

      limit,

      search,

      role,

      plan,

      status,

      verified,

      profileCompleted,

      sortBy,

      sortOrder,

    }

  );

  return {

  statistics,

  users: users.users,

  pagination:
    users.pagination,

};

  };
