jest.mock("../../services/user.service");

import { UserController } from "../user.controller";
import UserService from "../../services/user.service";
import { CreateUserBodyDto } from "../../dtos";

describe(UserController.name, () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    userService = new UserService();
    controller = new UserController(userService);
  });

  afterEach(() => jest.clearAllMocks());

  describe("core", () => {
    it("controller should be defined", () => {
      expect(controller).toBeDefined();
    });
  });

  describe(UserController.prototype.create.name, () => {
    const body = {
      name: "name",
      country: "UA",
    } as CreateUserBodyDto;
    const response = { status: true };

    it('should return "{ status: true }"', async () => {
      const addSpy = jest
        .spyOn(userService, "add")
        .mockImplementation(() => Promise.resolve(response));
      const result = await controller.create(body);

      expect(result).toEqual(response);

      expect(addSpy).toHaveBeenCalledTimes(1);
      expect(addSpy).toHaveBeenCalledWith(body);
    });
  });
});
