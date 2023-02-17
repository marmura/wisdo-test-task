import { model, Schema } from "mongoose";
import { truncate } from "../utils/string.utils";
import { IPost, PostStatusEnum } from "../types";
import { WEIGHTED_SCORE_COEFFICIENTS } from "../constants";

const postSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: false,
    },
    body: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: false,
      default: 0,
    },
    // can be calculated by update action or by cron
    score: {
      type: Number,
      required: false,
      default: 0,
    },
    status: {
      type: String,
      default: "pending",
      enum: PostStatusEnum,
      required: false,
    },
    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

postSchema.pre("save", function (next) {
  if (!this.summary) {
    this.summary = truncate(this.body, 100);
  }

  // in case don't use cron
  this.score =
    this.likes * WEIGHTED_SCORE_COEFFICIENTS.likes +
    this.body.length * WEIGHTED_SCORE_COEFFICIENTS.postLength;

  return next();
});

export default model<IPost>("Post", postSchema);
