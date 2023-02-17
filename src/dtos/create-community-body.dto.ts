import {
  IsString,
  IsEmail,
  IsUrl,
  IsOptional,
  IsEnum,
  MaxLength,
} from "class-validator";

export class CreateCommunityBodyDto {
  @IsString()
  @MaxLength(60)
  title: string;

  @IsUrl()
  @IsOptional()
  image: string;
}
