import mongoose,{ Schema, model, Types } from "mongoose";

const scheme = new Schema(
  {
   status:{
    type: String,
    default: "pending",
    enum: ["pending", "accepted", "rejected"],
   },

    sender: {
      type: Types.ObjectId,
      ref: "User",
      require: true,
    },
    receiver: {
      type: Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Request = mongoose.models.Request || model("Request", scheme);
