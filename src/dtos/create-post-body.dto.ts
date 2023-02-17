import { IsString, MaxLength, IsOptional, IsNumber } from "class-validator";

export class CreatePostBodyDto {
  @IsString()
  @MaxLength(60)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  summary: string;

  @IsString()
  @MaxLength(150)
  body: string;

  @IsString()
  community: string;

  @IsNumber()
  @IsOptional()
  likes: number;
}
