import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

export class UpdateDropStatusDto {
  @ApiProperty({
    enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'DELIVERED'],
    description: 'Status to update the drop to',
    example: 'ACCEPTED',
  })
  @IsEnum(['PENDING', 'ACCEPTED', 'REJECTED', 'DELIVERED'])
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'DELIVERED';

  @ApiProperty({
    description: 'ID of the admin performing the action',
    example: 1,
  })
  @IsInt()
  adminId: number;

  @ApiProperty({
    description: 'ID of the hub (required if status is DELIVERED)',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  hubId?: number;
}
