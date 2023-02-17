import { AppController } from "../app.controller";

describe(AppController.name, () => {
  let controller: AppController;

  beforeEach(async () => {
    controller = new AppController();
  });

  afterEach(() => jest.clearAllMocks());

  describe("core", () => {
    it("controller should be defined", () => {
      expect(controller).toBeDefined();
    });
  });

  describe(AppController.prototype.getHealthcheck.name, () => {
    it('should return "{ health: true }"', async () => {
      const res = controller.getHealthcheck();
      expect(res).toEqual({ health: true });
    });
  });
});
