import { Cutoff } from "../../../cutoffs/cutoff.model.js";

export const getCutoffOverview = async () => {
  const [overview] = await Cutoff.aggregate([
    {
      $group: {
        _id: null,

        total: {
          $sum: 1,
        },

        active: {
          $sum: {
            $cond: [
              { $eq: ["$status", "active"] },
              1,
              0,
            ],
          },
        },

        inactive: {
          $sum: {
            $cond: [
              { $eq: ["$status", "inactive"] },
              1,
              0,
            ],
          },
        },

        aiq: {
          $sum: {
            $cond: [
              { $eq: ["$counsellingType", "AIQ"] },
              1,
              0,
            ],
          },
        },

        state: {
          $sum: {
            $cond: [
              { $eq: ["$counsellingType", "STATE"] },
              1,
              0,
            ],
          },
        },
      },
    },
  ]);

  return {
    cutoffs: {
      total: overview?.total || 0,
      active: overview?.active || 0,
      inactive: overview?.inactive || 0,
      aiq: overview?.aiq || 0,
      state: overview?.state || 0,
    },
  };
};