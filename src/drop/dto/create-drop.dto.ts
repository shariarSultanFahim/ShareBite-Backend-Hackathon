import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';

// Declare DropType enum in the same fil

export class CreateDropDto {
  @ApiProperty({ enum: ['Food', 'Medicine', 'Cloth'] })
  @IsNotEmpty()
  @IsEnum(['Food', 'Medicine', 'Cloth'])
  drop_type: 'Food' | 'Medicine' | 'Cloth';

  @ApiProperty({ type: String, required: false })
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
