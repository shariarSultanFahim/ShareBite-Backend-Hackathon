import { PartialType } from '@nestjs/swagger';
import { CreateDropDto } from './create-drop.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';

export class UpdateDropDto extends PartialType(CreateDropDto) {
  @ApiProperty({
    example: 1,
    description: 'ID of the hub where the drop will be stored',
  })
  @IsInt()
  hubId: number;

  @ApiProperty({
    example: 1,
    description: 'ID of the admin who accepted the drop',
  })
  @IsInt()
  adminId: number;

  @ApiProperty({
    enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'DELIVERED'],
    description: 'Status of the drop',
  })
  @IsEnum(['PENDING', 'ACCEPTED', 'REJECTED', 'DELIVERED'])
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'DELIVERED';
}
