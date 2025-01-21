import { IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  goalCount: number;

  @IsDateString()
  @IsNotEmpty()
  birthDate: string;

  @IsInt()
  @IsNotEmpty()
  teamId: number;
}
