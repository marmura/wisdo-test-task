jest.mock("../../services/post.service");

import { PostController } from "../post.controller";
import PostService from "../../services/post.service";
import { CreatePostBodyDto } from "../../dtos";
import { IUser } from "../../types";

const user = {
  id: "id",
} as IUser;

describe(PostController.name, () => {
  let controller: PostController;
  let postService: PostService;

  beforeEach(async () => {
    postService = new PostService();
    controller = new PostController(postService);
  });

  afterEach(() => jest.clearAllMocks());

  describe("core", () => {
    it("controller should be defined", () => {
      expect(controller).toBeDefined();
    });
  });

  describe(PostController.prototype.getCommunityFeed.name, () => {
    const communityId = "communityId";
    const response = [{ id: "id" }];

    it('should return "{ status: true }"', async () => {
      const getCommunityFeedForUserSpy = jest
        .spyOn(postService, "getCommunityFeedForUser")
        .mockImplementation(() => Promise.resolve(response));
      const result = await controller.getCommunityFeed(communityId, user);

      expect(result).toEqual(response);

      expect(getCommunityFeedForUserSpy).toHaveBeenCalledTimes(1);
      expect(getCommunityFeedForUserSpy).toHaveBeenCalledWith(
        communityId,
        user.id
      );
    });
  });

  describe(PostController.prototype.create.name, () => {
    const body = {
      title: "title",
      body: "body",
      community: "id",
    } as CreatePostBodyDto;
    const response = { status: true };

    it('should return "{ status: true }"', async () => {
      const addSpy = jest
        .spyOn(postService, "add")
        .mockImplementation(() => Promise.resolve(response));

      const result = await controller.create(body, user);

      expect(result).toEqual(response);

      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(addSpy).toHaveBeenCalledWith(body, user.id);
    });
  });

  describe(PostController.prototype.like.name, () => {
    const id = "id";
    const response = { status: true };

    it('should return "{ status: true }"', async () => {
      const likeSpy = jest
        .spyOn(postService, "like")
        .mockImplementation(() => Promise.resolve(response));

      const result = await controller.like(id);

      expect(result).toEqual(response);

      expect(likeSpy).toHaveBeenCalledTimes(1);
      expect(likeSpy).toHaveBeenCalledWith(id);
    });
  });
});
