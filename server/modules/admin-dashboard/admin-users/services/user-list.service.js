import { User } from "../../../users/user.model.js";

import {
  buildSearchQuery,
  buildFilters,
} from "./user-query.service.js";

const DEFAULT_PAGE = 1;

const DEFAULT_LIMIT = 10;

const DEFAULT_SORT = {
  createdAt: -1,
};

export const getUserList =
  async (query) => {

    const {

      page = DEFAULT_PAGE,

      limit = DEFAULT_LIMIT,

      search,

      sortBy = "createdAt",

      order = "desc",

      role,

      status,

      verified,

      profileCompleted,

    } = query;

    const {

      userFilter,

    } = buildFilters({

      role,

      status,

      verified,

      profileCompleted,

    });

    const searchQuery =
      buildSearchQuery(
        search
      );

    const finalQuery = {

      ...userFilter,

      ...searchQuery,

    };

    const sort = {

      [sortBy]:
        order === "asc"
          ? 1
          : -1,

    };

    const users =
      await User.find(
        finalQuery
      )
        .sort(sort)
        .skip(
          (page - 1) * limit
        )
        .limit(
          Number(limit)
        )
        .lean();

    const total =
      await User.countDocuments(
        finalQuery
      );

    return {

      users,

      pagination: {

        page:
          Number(page),

        limit:
          Number(limit),

        total,

        pages:
          Math.ceil(
            total / limit
          ),

      },

    };

  };