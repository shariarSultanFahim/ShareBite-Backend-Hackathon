import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateHubDto {
  @ApiProperty({ description: 'Name of the hub', example: 'Dhaka Central Hub' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Location of the hub',
    example: 'Dhaka, Bangladesh',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'Contact number for the hub',
    example: '+8801712345678',
  })
  @IsString()
  contact: string;
}
