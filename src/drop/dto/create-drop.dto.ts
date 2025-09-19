import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';

// Declare DropType enum in the same file
export enum DropType {
  FOOD = 'FOOD',
  MEDICINE = 'MEDICINE',
  CLOTHING = 'CLOTHING',
}

export class CreateDropDto {
  @ApiProperty({ enum: DropType })
  @IsNotEmpty()
  @IsEnum(DropType)
  drop_type: DropType;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsString({ each: true })
  images?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  assumed_person_for: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  donor_id: number;
}
