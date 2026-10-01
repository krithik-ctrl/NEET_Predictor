import { User } from "./user.model.js";

import {
  createFreeSubscription,
} from "../subscription/subscription.helper.js";
import {
  lockRankIfUnset,
  parseRank,
} from "../student-profile/studentProfile.service.js";

// Optional signup rank: never blocks account creation / OTP on failure.
const captureSignupRank = async (userId, rawRank) => {
  const rank = parseRank(rawRank);
  if (rank === null) return;
  try {
    await lockRankIfUnset(userId, rank);
  } catch (error) {
    console.error(`[SIGNUP] Failed to save rank for user ${userId}:`, error.message);
  }
};

export const createUser =
  async (payload) => {

    const existingUser =
      await User.findOne({
        mobile: payload.mobile,
      });

    if (existingUser) {
      throw new Error(
        "User already exists"
      );
    }

    const user =
      await User.create({
        name: payload.name,
        mobile: payload.mobile,
        email:
          payload.email || undefined,
        provider:
          payload.provider ||
          "local",
    });

    await createFreeSubscription(
      user._id
    );

    return user;

  };



export const getUserByMobile =
  async (mobile) => {

    return await User.findOne({
      mobile,
    });

  };



export const getUserById =
  async (id) => {

    return await User.findById(id);

  };


export const createOtpUser =
  async ({
    name,
    mobile,
    email,
  }) => {

    const user =
      await User.create({

        name,

        mobile,

        email:
          email || undefined,

        provider:
          "local",

      });

    await createFreeSubscription(
      user._id
    );

    return user;

  };



export const updateLastLogin =
  async (userId) => {

    return await User.findByIdAndUpdate(

      userId,

      {
        lastLogin:
          new Date(),
      },

      {
        new: true,
      }

    );

  };



export const createGoogleUser =
  async (payload) => {

    let user =
      await User.findOne({
        email:
          payload.email,
      });

    if (user) {
      return user;
    }

    user =
      await User.create({

        name:
          payload.name,

        email:
          payload.email,

        avatar:
          payload.avatar || "",

        provider:
          "google",

      });

    await createFreeSubscription(
      user._id
    );

    return user;

  };

export const createPendingUser =
  async ({
    firstName,
    lastName,
    email,
    mobile,
    rank,
  }) => {

    const existingUser =
      await User.findOne({
        mobile,
      });

    if (existingUser) {

      // Retry/back case: fill a missing rank for a still-pending account
      // (never overwrites a saved rank; verified accounts are left alone).
      if (!existingUser.isVerified) {
        await captureSignupRank(existingUser._id, rank);
      }

      return {
        user: existingUser,
        isNewUser: false,
      };

    }

    if (email) {

      const existingEmail =
        await User.findOne({
          email,
        });

      if (existingEmail) {
        throw new Error(
          "Email already exists."
        );
      }

    }

    const user =
      await User.create({

        firstName,

        lastName,

        email:
          email || undefined,

        mobile,

        provider: "local",

        isVerified: false,

      });

    await createFreeSubscription(
      user._id
    );

    await captureSignupRank(user._id, rank);

    return {

      user,

      isNewUser: true,

    };

  };


  export const checkEmailExists = async (email) => { if (!email) return false; const existing = await User.findOne({ email: String(email).toLowerCase().trim(), }); return !!existing; };