

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


const [

  statistics,

  students,

  admins,

  counsellors,

] = await Promise.all([

  getUserStatistics(),

  getUserList(),

  getAdminList(),

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