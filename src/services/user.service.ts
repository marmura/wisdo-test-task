import { Service } from "typedi";
import { UserModel } from "../models";
import { CreateUserBodyDto } from "../dtos/create-user-body.dto";

@Service()
export default class UserService {
  async add(dto: CreateUserBodyDto) {
    const user = new UserModel(dto);
    await user.save();
    return { status: true };
  }
}
