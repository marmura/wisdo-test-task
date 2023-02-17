jest.mock("../../services/community.service");

import { CommunityController } from "../community.controller";
import CommunityService from "../../services/community.service";
import { CreateCommunityBodyDto } from "../../dtos";
import { IUser } from "../../types";

describe(CommunityController.name, () => {
  let controller: CommunityController;
  let communityService: CommunityService;

  beforeEach(async () => {
    communityService = new CommunityService();
    controller = new CommunityController(communityService);
  });

  afterEach(() => jest.clearAllMocks());

  describe("core", () => {
    it("controller should be defined", () => {
      expect(controller).toBeDefined();
    });
  });

  describe(CommunityController.prototype.create.name, () => {
    const body = {
      title: "namtitlee",
      image: "image",
    } as CreateCommunityBodyDto;
    const response = { status: true };

    it('should return "{ status: true }"', async () => {
      const addSpy = jest
        .spyOn(communityService, "add")
        .mockImplementation(() => Promise.resolve(response));

      const result = await controller.create(body);

      expect(result).toEqual(response);

      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(addSpy).toHaveBeenCalledWith(body);
    });
  });

  describe(CommunityController.prototype.join.name, () => {
    const user = {
      id: "id",
    } as IUser;
    const communityId = "communityId";

    it('should return "{ status: true }"', async () => {
      const joinCommunitySpy = jest
        .spyOn(communityService, "join")
        .mockImplementation(() =>
          Promise.resolve({
            status: true,
          })
        );
      const result = await controller.join(communityId, user);

      expect(result).toEqual({ status: true });

      expect(joinCommunitySpy).toHaveBeenCalledTimes(1);
      expect(joinCommunitySpy).toHaveBeenCalledWith(user.id, communityId);
    });
  });
});
