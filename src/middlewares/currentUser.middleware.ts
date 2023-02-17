import { Action } from "routing-controllers";
import { UserModel } from "../models";

export class CurrentUserMiddleware {
  static async currentUserChecker(action: Action) {
    const userId = action.request.headers["userid"];

    if (userId) {
      const user = await UserModel.findById(userId).lean();
      return {
        ...user,
        id: userId,
      };
    }
  }
}
