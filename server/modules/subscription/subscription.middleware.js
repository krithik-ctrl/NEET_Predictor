// subscription.middleware.js

import { checkSubscription } from "./subscription.helper.js";

export const requirePremium = async (
  req,
  res,
  next
) => {
  try {

    const subscription =
      await checkSubscription(
        req.user.userId
      );

    if (!subscription.isPremium) {
      return res.status(403).json({
        success: false,
        message:
          "Premium subscription required to access this feature.",
      });
    }

    req.subscription =
      subscription;

    next();

  } catch (error) {

    return res.status(403).json({
      success: false,
      message:
        "Premium subscription required to access this feature.",
    });

  }
};