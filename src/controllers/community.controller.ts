import {
  JsonController,
  Body,
  Post,
  Authorized,
  Param,
  CurrentUser,
} from "routing-controllers";
import { Service } from "typedi";
import { CommunityService } from "../services";
import { CreateCommunityBodyDto } from "../dtos";
import { IUser } from "../types";

@JsonController()
@Service()
export class CommunityController {
  constructor(private communityService: CommunityService) {}

  @Post("/community")
  create(@Body() body: CreateCommunityBodyDto) {
    return this.communityService.add(body);
  }

  @Authorized()
  @Post("/community/:id/join")
  join(@Param("id") communityId: string, @CurrentUser() { id }: IUser) {
    return this.communityService.join(id, communityId);
  }
}
