import { Action } from "routing-controllers";
import { UserModel } from "../models";

export class AuthMiddleware {
  static async authorizationChecker(action: Action) {
    const userId = action.request.headers["userid"];
    if (!userId) {
      return false;
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      return false;
    }
    return true;
  }
}
