import mongoose from "mongoose";

const adminOtpSchema =
  new mongoose.Schema(
    {
      mobile: {
        type: String,
        required: true,
        trim: true,
      },

      otp: {
        type: String,
        required: true,
      },

      expiresAt: {
        type: Date,
        required: true,
      },

      verified: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

/*
|--------------------------------------------------------------------------
| Auto Delete Expired OTPs
|--------------------------------------------------------------------------
*/

adminOtpSchema.index(
  {
    expiresAt: 1,
  },
  {
    expireAfterSeconds: 0,
  }
);

/*
|--------------------------------------------------------------------------
| Search Index
|--------------------------------------------------------------------------
*/

adminOtpSchema.index({
  mobile: 1,
});

export const AdminOtp =
  mongoose.model(
    "AdminOtp",
    adminOtpSchema
  );