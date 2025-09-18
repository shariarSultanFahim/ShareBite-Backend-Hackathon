import { Body, Controller, Post } from '@nestjs/common';
import { DonorAuthService } from './donor-auth.service';
import { CreateDonorAuthDto } from './dto/create-donor-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { DonorLoginDto } from './dto/donor-login.dto';

@ApiTags('Donor Authentication')
@Controller('donor/')
export class DonorAuthController {
  constructor(private donorAuthService: DonorAuthService) {}

  @Post('register')
  register(@Body() dto: CreateDonorAuthDto) {
    console.log('Register attempt:', dto);
    // Hash password and create donor
    return this.donorAuthService.register(dto);
  }

  @Post('login')
  login(@Body() dto: DonorLoginDto) {
    return this.donorAuthService.login(dto);
  }
}
