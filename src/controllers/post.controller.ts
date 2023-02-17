import {
  JsonController,
  CurrentUser,
  Body,
  Get,
  Post,
  Param,
  Authorized,
} from "routing-controllers";
import { Service } from "typedi";
import { PostService } from "../services";
import { CreatePostBodyDto } from "../dtos";
import { IUser } from "../types";

@JsonController()
@Service()
export class PostController {
  constructor(private postService: PostService) {}

  @Authorized()
  @Get("/post/community/:id/feed")
  getCommunityFeed(
    @Param("id") communityId: string,
    @CurrentUser() { id }: IUser
  ) {
    return this.postService.getCommunityFeedForUser(communityId, id);
  }

  @Authorized()
  @Post("/post")
  create(@Body() body: CreatePostBodyDto, @CurrentUser() { id }: IUser) {
    return this.postService.add(body, id);
  }

  @Authorized()
  @Post("/post/:id/like")
  like(@Param("id") id: string) {
    return this.postService.like(id);
  }
}
