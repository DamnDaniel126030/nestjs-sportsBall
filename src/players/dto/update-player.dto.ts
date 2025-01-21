import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @IsOptional()
  goalCount?: number;

  @IsDateString()
  @IsOptional()
  birthDate?: string;
}
