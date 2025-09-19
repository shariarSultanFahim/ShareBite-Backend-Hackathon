// // import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
// // import { DonorAuthService } from './donor-auth.service';
// // import { CreateDonorAuthDto } from './dto/create-donor-auth.dto';
// // import { ApiTags } from '@nestjs/swagger';
// // import { DonorLoginDto } from './dto/donor-login.dto';

// // @ApiTags('Donor Authentication')
// // @Controller('donor/')
// // export class DonorAuthController {
// //   constructor(private donorAuthService: DonorAuthService) {}

// //   @Post('register')
// //   register(@Body() dto: CreateDonorAuthDto) {
// //     console.log('Register attempt:', dto);
// //     // Hash password and create donor
// //     return this.donorAuthService.register(dto);
// //   }

// //   @Post('login')
// //   login(@Body() dto: DonorLoginDto) {
// //     console.log('Login attempt:', dto);
// //     return this.donorAuthService.login(dto);
// //   }

// //   @Post('logout')
// //   logout(@Body() auth_session: any) {
// //     console.log('Logout attempt:', auth_session);
// //     return this.donorAuthService.logout(auth_session);
// //   }

// // }
// import {
//   Body,
//   Controller,
//   Post,
//   Get,
//   Param,
//   UseGuards,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { DonorAuthService } from './donor-auth.service';
// import { CreateDonorAuthDto } from './dto/create-donor-auth.dto';
// import { DonorLoginDto } from './dto/donor-login.dto';
// import { ApiTags } from '@nestjs/swagger';
// import { DonorAuth } from './donor-auth.guard';

// @ApiTags('Donor Authentication')
// @Controller('donor')
// export class DonorAuthController {
//   constructor(private donorAuthService: DonorAuthService) {}

//   @Post('register')
//   register(@Body() dto: CreateDonorAuthDto) {
//     return this.donorAuthService.register(dto);
//   }

//   @Post('login')
//   login(@Body() dto: DonorLoginDto) {
//     return this.donorAuthService.login(dto);
//   }

//   @Post('logout')
//   @UseGuards(DonorAuth)
//   logout(@Body() auth_session: any) {
//     return this.donorAuthService.logout(auth_session);
//   }

//   // Get donor info by ID (guarded)
//   @Get(':id')
//   @UseGuards(DonorAuth)
//   async findOne(@Param('id') id: string) {
//     const donor = await this.donorAuthService.findOne(+id);
//     if (!donor) {
//       throw new UnauthorizedException('Donor not found');
//     }
//     return donor;
//   }
// }

import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { DonorAuthService } from './donor-auth.service';
import { CreateDonorAuthDto } from './dto/create-donor-auth.dto';
import { DonorLoginDto } from './dto/donor-login.dto';
import { ApiTags } from '@nestjs/swagger';
import { DonorAuth } from './donor-auth.guard';

@ApiTags('Donor Authentication')
@Controller('donor')
export class DonorAuthController {
  constructor(private donorAuthService: DonorAuthService) {}

  @Post('register')
  register(@Body() dto: CreateDonorAuthDto) {
    return this.donorAuthService.register(dto);
  }

  @Post('login')
  login(@Body() dto: DonorLoginDto) {
    return this.donorAuthService.login(dto);
  }

  @Post('logout')
  @UseGuards(DonorAuth)
  logout(@Body() auth_session: any) {
    return this.donorAuthService.logout(auth_session);
  }

  // Get donor info by ID (guarded)
  @Get(':id')
  // @UseGuards(DonorAuth)
  async findOne(@Param('id') id: string) {
    return await this.donorAuthService.findOne(+id);
  }
}
