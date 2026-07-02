import { User } from "./user.model.js";

import {
  createFreeSubscription,
} from "../subscription/subscription.helper.js";

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
  }) => {

    const existingMobile =
      await User.findOne({
        mobile,
      });

    if (existingMobile) {
      throw new Error(
        "Mobile number already registered."
      );
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

    return user;

  };