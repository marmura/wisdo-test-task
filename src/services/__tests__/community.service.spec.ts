import CommunityService from "../community.service";
import CommunityModel from "../../models/community.model";
import UserModel from "../../models/user.model";
import { CreateCommunityBodyDto } from "../../dtos";

jest.mock("../../models/user.model", () => jest.fn());
jest.mock("../../models/community.model", () => jest.fn());

const saveUser = jest.fn(() => "success");

const user = { id: "id", communities: [], save: saveUser };
const community = { id: "id" };

const findByIdUser = jest.fn().mockImplementation(() => Promise.resolve(null));

UserModel.findById = findByIdUser as any;

const saveCommunity = jest.fn(() => "success");
const findByIdCommunity = jest
  .fn()
  .mockImplementation(() => Promise.resolve(null));

(CommunityModel as unknown as jest.Mock).mockImplementation(() => ({
  save: saveCommunity,
}));

// investigate type
CommunityModel.findById = findByIdCommunity as any;

describe(CommunityService.name, () => {
  let service: CommunityService;

  beforeEach(async () => {
    service = new CommunityService();
  });

  afterEach(() => jest.clearAllMocks());

  describe("core", () => {
    it("controller should be defined", () => {
      expect(service).toBeDefined();
    });
  });

  describe(CommunityService.prototype.add.name, () => {
    const body = {
      title: "title",
      image: "image",
    } as CreateCommunityBodyDto;
    const response = { status: true };

    it('should return "{ status: true }"', async () => {
      const result = await service.add(body);

      expect(result).toEqual(response);
      expect(saveCommunity).toHaveBeenCalledTimes(1);
    });
  });

  describe(CommunityService.prototype.join.name, () => {
    const userId = "userId";
    const communityId = "communityId";
    const response = { status: true };

    it("should return error - community not found", async () => {
      findByIdCommunity.mockImplementation(() => Promise.resolve(null));

      try {
        await service.join(userId, communityId);

        expect(findByIdCommunity).toHaveBeenCalledTimes(1);
        expect(findByIdCommunity).toHaveBeenCalledWith(communityId);

        expect(findByIdUser).toHaveBeenCalledTimes(0);
        expect(saveUser).toHaveBeenCalledTimes(0);
      } catch (e: unknown) {
        expect((e as { message: string }).message).toEqual(
          "Community was not found"
        );
      }
    });

    it("should return error - user already joined", async () => {
      findByIdCommunity.mockImplementation(() => Promise.resolve(community));
      findByIdUser.mockImplementation(() =>
        Promise.resolve({ ...user, communities: [communityId] })
      );

      try {
        await service.join(userId, communityId);

        expect(findByIdCommunity).toHaveBeenCalledTimes(1);
        expect(findByIdCommunity).toHaveBeenCalledWith(communityId);

        expect(findByIdUser).toHaveBeenCalledTimes(1);
        expect(findByIdUser).toHaveBeenCalledWith(userId);

        expect(saveUser).toHaveBeenCalledTimes(0);
      } catch (e: unknown) {
        expect((e as { message: string }).message).toEqual(
          "User already joined this community"
        );
      }
    });

    it("should return error - user not found", async () => {
      findByIdCommunity.mockImplementation(() => Promise.resolve(community));
      findByIdUser.mockImplementation(() => Promise.resolve(null));

      try {
        await service.join(userId, communityId);

        expect(findByIdCommunity).toHaveBeenCalledTimes(1);
        expect(findByIdCommunity).toHaveBeenCalledWith(communityId);

        expect(findByIdUser).toHaveBeenCalledTimes(1);
        expect(findByIdUser).toHaveBeenCalledWith(userId);

        expect(saveUser).toHaveBeenCalledTimes(0);
      } catch (e: unknown) {
        expect((e as { message: string }).message).toEqual(
          "User was not found"
        );
      }
    });

    it('should return "{ status: true }"', async () => {
      findByIdCommunity.mockImplementation(() => Promise.resolve(community));
      findByIdUser.mockImplementation(() => Promise.resolve(user));

      const result = await service.join(userId, communityId);

      expect(result).toEqual(response);

      expect(findByIdCommunity).toHaveBeenCalledTimes(1);
      expect(findByIdCommunity).toHaveBeenCalledWith(communityId);

      expect(findByIdUser).toHaveBeenCalledTimes(1);
      expect(findByIdUser).toHaveBeenCalledWith(userId);

      expect(saveUser).toHaveBeenCalledTimes(1);
    });
  });
});
