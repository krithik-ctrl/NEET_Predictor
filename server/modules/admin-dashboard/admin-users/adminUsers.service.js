import {
  buildUserQuery,
} from "./services/user-query.service.js";

import {
  getUserStatistics,
} from "./services/user-statistics.service.js";

import {
  getUserList,
} from "./services/user-list.service.js";

import {buildUserResponse} from "./services/user-response.service.js"



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

    const filters =
      buildUserQuery({

        search,

        role,

        plan,

        status,

        verified,

        profileCompleted,

      });

    const [

      statistics,

      users,

    ] = await Promise.all([

      getUserStatistics(),

      getUserList({

        filters,

        page,

        limit,

        sortBy,

        sortOrder,

      }),

    ]);

    return buildUserResponse({

      statistics,

      users,

    });

  };