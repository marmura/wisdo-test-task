import { BadRequestError, NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { CommunityModel, UserModel } from "../models";
import { CreateCommunityBodyDto } from "../dtos";

@Service()
export default class CommunityService {
  async add(dto: CreateCommunityBodyDto) {
    const community = new CommunityModel(dto);
    await community.save();
    return { status: true };
  }

  async join(userId: string, communityId: string) {
    const community = await CommunityModel.findById(communityId);

    if (!community) {
      throw new NotFoundError("Community was not found");
    }
    const user = await UserModel.findById(userId);

    if (user) {
      if (user.communities.indexOf(communityId) === -1) {
        user.communities.push(communityId);
        await user.save();

        return { status: true };
      } else {
        throw new BadRequestError("User already joined this community");
      }
    } else {
      throw new NotFoundError("User was not found");
    }
  }
}
