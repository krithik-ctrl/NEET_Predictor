import mongoose from "mongoose";

const adminActivitySchema = new mongoose.Schema(
  {
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    actorRole: {
      type: String,
      default: null,
    },

    action: {
      type: String,
      required: true,
    },

    targetAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    meta: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    ip: {
      type: String,
      default: null,
    },

    userAgent: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

adminActivitySchema.index({
  actorId: 1,
  createdAt: -1,
});

adminActivitySchema.index({
  targetAdminId: 1,
  createdAt: -1,
});

export const AdminActivityLog = mongoose.model(
  "AdminActivityLog",
  adminActivitySchema
);
