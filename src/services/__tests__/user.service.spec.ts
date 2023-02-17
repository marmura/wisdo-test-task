import UserService from "../user.service";
import UserModel from "../../models/user.model";
import { CreateUserBodyDto } from "../../dtos/create-user-body.dto";

jest.mock("../../models/user.model", () => jest.fn());

const user = { id: "id" };

const save = jest.fn(() => "success");
const findById = jest.fn(() => user);
(UserModel as unknown as jest.Mock).mockImplementation(() => ({
  save,
  findById,
}));

describe(UserService.name, () => {
  let service: UserService;

  beforeEach(async () => {
    service = new UserService();
  });

  afterEach(() => jest.clearAllMocks());

  describe("core", () => {
    it("controller should be defined", () => {
      expect(service).toBeDefined();
    });
  });

  describe(UserService.prototype.add.name, () => {
    const body = {
      name: "name",
      country: "UA",
    } as CreateUserBodyDto;
    const response = { status: true };

    it('should return "{ status: true }"', async () => {
      const result = await service.add(body);

      expect(result).toEqual(response);
      expect(save).toHaveBeenCalledTimes(1);
    });
  });
});
