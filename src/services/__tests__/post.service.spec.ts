import PostService from "../post.service";
import CommunityModel from "../../models/community.model";
import PostModel from "../../models/post.model";
import UserModel from "../../models/user.model";
import { CreatePostBodyDto } from "../../dtos";

jest.mock("../../models/user.model", () => jest.fn());
jest.mock("../../models/community.model", () => jest.fn());
jest.mock("../../models/post.model", () => jest.fn());

const saveUser = jest.fn(() => "success");
const user = {
  id: "id",
  email: "email@test.com",
  communities: [],
  save: saveUser,
};
const findByIdUser = jest.fn().mockImplementation(() => Promise.resolve(null));
const findUser = jest
  .fn()
  .mockImplementation(() => Promise.resolve([user, user]));

UserModel.findById = findByIdUser as any;
UserModel.find = findUser as any;

const community = { id: "id" };
const saveCommunity = jest.fn(() => "success");
const findByIdCommunity = jest
  .fn()
  .mockImplementation(() => Promise.resolve(null));
(CommunityModel as unknown as jest.Mock).mockImplementation(() => ({
  save: saveCommunity,
}));
// investigate type
CommunityModel.findById = findByIdCommunity as any;

const savedPost = { id: "saveId" };
const savePost = jest.fn().mockImplementation(() => Promise.resolve(savedPost));
const post = { id: "id", save: savePost };

const findByIdPost = jest.fn().mockImplementation(() => Promise.resolve(null));
(PostModel as unknown as jest.Mock).mockImplementation(() => ({
  save: savePost,
}));
// investigate type
PostModel.findById = findByIdPost as any;

describe(PostService.name, () => {
  let service: PostService;

  beforeEach(async () => {
    service = new PostService();
  });

  afterEach(() => jest.clearAllMocks());

  describe("core", () => {
    it("controller should be defined", () => {
      expect(service).toBeDefined();
    });
  });

  describe(PostService.prototype.like.name, () => {
    const id = "id";
    const response = { status: true };

    it('should return "{ status: true }"', async () => {
      findByIdPost.mockImplementation(() => Promise.resolve(post));

      const result = await service.like(id);

      expect(result).toEqual(response);

      expect(findByIdPost).toHaveBeenCalledTimes(1);
      expect(findByIdPost).toHaveBeenCalledWith(id);

      expect(savePost).toHaveBeenCalledTimes(1);
    });

    it("should return error - post was not found", async () => {
      findByIdPost.mockImplementation(() => Promise.resolve(null));

      try {
        await service.like(id);

        expect(findByIdPost).toHaveBeenCalledTimes(1);
        expect(findByIdPost).toHaveBeenCalledWith(id);

        expect(savePost).toHaveBeenCalledTimes(0);
      } catch (e: unknown) {
        expect((e as { message: string }).message).toEqual(
          "Post was not found."
        );
      }
    });
  });

  describe(PostService.prototype.add.name, () => {
    const body = {
      title: "title",
      body: "body",
      community: "id",
    } as CreatePostBodyDto;
    const userId = "userId";
    const response = { status: true };

    it('should return "{ status: true }"', async () => {
      findByIdCommunity.mockImplementation(() => Promise.resolve(community));
      const result = await service.add(body, userId);
      expect(result).toEqual(response);
      expect(savePost).toHaveBeenCalledTimes(1);
    });

    it("should return error - community was not found", async () => {
      findByIdCommunity.mockImplementation(() => Promise.resolve(null));

      try {
        await service.add(body, userId);
        expect(findByIdCommunity).toHaveBeenCalledTimes(1);
        expect(findByIdCommunity).toHaveBeenCalledWith(body.community);
        expect(savePost).toHaveBeenCalledTimes(0);
      } catch (e: unknown) {
        expect((e as { message: string }).message).toEqual(
          "Community was not found."
        );
      }
    });
  });
});
