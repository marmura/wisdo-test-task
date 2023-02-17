import { model, Schema } from "mongoose";
import { ICommunity } from "../types";

const communitySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    membersCount: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  { timestamps: true }
);

export default model<ICommunity>("Community", communitySchema);
