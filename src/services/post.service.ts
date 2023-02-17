import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { Types } from "mongoose";
import { PostModel, CommunityModel, UserModel } from "../models";
import { isWordsInString } from "../utils/string.utils";
import { sendEmail } from "../utils/email.utils";
import { CreatePostBodyDto } from "../dtos";
import { IPost, UserRoleEnum } from "../types";
import { WORDS_BLACK_LIST } from "../constants";

@Service()
export default class PostService {
  async getCommunityFeedForUser(communityId: string, userId: string) {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new NotFoundError(`User was not found.`);
    }

    // add paggination
    return PostModel.aggregate([
      {
        $match: {
          community: new Types.ObjectId(communityId),
        },
      },
      // can be replaced by field country in PostModel
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author",
      },
      {
        $addFields: {
          order: {
            $cond: [
              {
                $eq: ["$author.country", user.country],
              },
              1,
              0,
            ],
          },
        },
      },
      { $sort: { order: -1, score: -1 } },
    ]);
  }

  async like(id: string) {
    const post = await PostModel.findById(id);

    if (!post) {
      throw new NotFoundError(`Post was not found.`);
    }

    post.likes = post.likes + 1;
    await post.save();

    return { status: true };
  }

  async add(dto: CreatePostBodyDto, userId: string) {
    const community = await CommunityModel.findById(dto.community);

    if (!community) {
      throw new NotFoundError("Community was not found.");
    }

    const newPost = new PostModel({
      ...dto,
      author: userId,
    });
    const savedPost = await newPost.save();

    this.validateByWatchlist(savedPost, WORDS_BLACK_LIST);

    return { status: true };
  }

  async validateByWatchlist(post: Partial<IPost>, list: string[]) {
    const { _id, title, body, summary } = post;
    let isValid = true;

    if (title) {
      isValid = isWordsInString(title, list);
    }
    if (summary && isValid) {
      isValid = isWordsInString(summary, list);
    }
    if (body && isValid) {
      isValid = isWordsInString(body, list);
    }

    if (!isValid) {
      const emails = (
        await UserModel.find({
          $or: [
            { role: UserRoleEnum.MODERATOR },
            { sector: UserRoleEnum.SUPER_MODERATOR },
          ],
        }).lean()
      ).map((u) => u.email);

      sendEmail({
        to: emails,
        subject: "watch list warning",
        body: `You can check it out by endpoint GET /post/${_id?.toString()}`,
      });
    }
  }
}
