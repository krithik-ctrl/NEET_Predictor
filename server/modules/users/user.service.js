import { User } from "./user.model.js";
import { hashPassword } from "../../auth/utils/hashPassword.js";

export const createUser = async (
  payload
) => {
  const existingUser =
    await User.findOne({
      email: payload.email,
    });

  if (existingUser) {
    throw new Error(
      "User already exists"
    );
  }

  const hashedPassword =
    await hashPassword(
      payload.password
    );

  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });

  return user;
};

export const getUserByEmail =
  async (email) => {
    return await User.findOne({
      email,
    });
  };

export const getUserById = async (
  id
) => {
  return await User.findById(id);
};