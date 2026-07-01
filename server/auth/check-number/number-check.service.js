import { User } from "../../modules/users/user.model.js";

export const checkRegisteredMobile =
  async (mobile) => {

    if (!mobile) {
      throw new Error(
        "Mobile number is required"
      );
    }

    const userExists =
      await User.exists({
        mobile,
      });

    if (!userExists) {
      throw new Error(
        "Mobile number is not registered. Please use Get Started to create an account."
      );
    }

    return true;

  };