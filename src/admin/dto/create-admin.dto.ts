// export class CreateAdminDto {
//   email: string;
//   phone: string;
//   username: string;
//   avatar?: string;
//   passhash: string;
//   passphrase: string;
//   role: 'ADMIN' | 'HUB_MANAGER' | 'RIDER';
// }
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ description: 'Admin email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Admin phone number' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Admin username' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Admin avatar URL', required: false })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ description: 'Hashed password for admin' })
  @IsOptional()
  @IsString()
  passhash: string;

  @ApiProperty({ description: 'Plain password (only for first-time creation)' })
  @IsString()
  passphrase: string;

  @ApiProperty({
    description: 'Role of the admin',
    enum: ['ADMIN', 'HUB_MANAGER', 'RIDER'],
  })
  @IsEnum(['ADMIN', 'HUB_MANAGER', 'RIDER'])
  role: 'ADMIN' | 'HUB_MANAGER' | 'RIDER';
}
