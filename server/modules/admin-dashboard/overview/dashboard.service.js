import {
  getAdminOverview,
} from "./services/admin-overview.service.js";
import { getChoiceListOverview } from "./services/choiceList-overview.service.js";
import { getCollegeOverview } from "./services/college-overview.service.js";
import { getCourseOverview } from "./services/course-overview.service.js";
import { getCutoffOverview } from "./services/cutoff-overview.service.js";
import { getPaymentOverview } from "./services/payment-overview.service.js";
import { getPredictionOverview } from "./services/prediction-overview.service.js";
import { getSavedCollegeOverview } from "./services/savedCollege-overview.service.js";

import {
  getUserOverview,
} from "./services/user-overview.service.js";

export const getDashboardOverview =
  async () => {
    const [
      adminOverview,
      userOverview,
      paymentsOverview,
    predictionsOverview,
    savedCollegesOverview,
    choiceListsOverview,
    collegesOverview,
    coursesOverview,
    cutoffOverview

    ] = await Promise.all([
      getAdminOverview(),
      getUserOverview(),
      getPaymentOverview(),
      getChoiceListOverview(),
      getSavedCollegeOverview(),
      getPredictionOverview(),
      getCutoffOverview(),
      getCourseOverview(),
      getCollegeOverview()
    ]);

    return {
      ...adminOverview,
      ...userOverview,
      ...paymentsOverview,
      ...predictionsOverview,
      ...choiceListsOverview,
      ...savedCollegesOverview,
      ...cutoffOverview,
      ...collegesOverview,
      coursesOverview
    };
  };