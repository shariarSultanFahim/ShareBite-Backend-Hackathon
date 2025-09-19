import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AcceptDropDto {
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
}
