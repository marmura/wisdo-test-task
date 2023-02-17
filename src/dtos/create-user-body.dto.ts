import { IsString, IsEmail, IsUrl, IsOptional, IsEnum } from "class-validator";
import { UserRoleEnum } from "../types";

export class CreateUserBodyDto {
  @IsString()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsUrl()
  @IsOptional()
  image: string;

  @IsString()
  country: string;

  @IsOptional()
  @IsEnum(UserRoleEnum, { each: true })
  role: string;
}
