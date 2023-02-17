import { JsonController, Body, Post } from "routing-controllers";
import { Service } from "typedi";
import { UserService } from "../services";
import { CreateUserBodyDto } from "../dtos";

@JsonController()
@Service()
export class UserController {
  constructor(private userService: UserService) {}

  @Post("/user")
  create(@Body() body: CreateUserBodyDto) {
    return this.userService.add(body);
  }
}
