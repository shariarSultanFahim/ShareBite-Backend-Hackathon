import { Module } from '@nestjs/common';
import { DonorAuthService } from './donor-auth.service';
import { DonorAuthController } from './donor-auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRY || '3d',
      },
    }),
  ],
  controllers: [DonorAuthController],
  providers: [DonorAuthService],
})
export class DonorAuthModule {}
