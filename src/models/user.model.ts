import { model, Schema } from "mongoose";
import { IUser, UserRoleEnum } from "../types";

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    // should be list of coutries in separate table
    country: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: UserRoleEnum,
      required: false,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    communities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Community",
      },
    ],
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
