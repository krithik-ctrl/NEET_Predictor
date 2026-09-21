import { User } from "../../../users/user.model.js";

/*
|--------------------------------------------------------------------------
| Deactivate Student (soft delete — isActive=false only, no cascade)
|--------------------------------------------------------------------------
*/

export const deactivateStudent =
  async (userId) => {

    const user =
      await User.findById(userId);

    if (!user) {
      const error = new Error(
        "Student not found."
      );
      error.status = 404;
      throw error;
    }

    user.isActive = false;

    await user.save();

    return {
      id: user._id,
      isActive: user.isActive,
    };

  };
