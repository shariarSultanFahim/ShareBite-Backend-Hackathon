import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDonorAuthDto } from './dto/create-donor-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { DonorLoginDto } from './dto/donor-login.dto';

@Injectable()
export class DonorAuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // LOGIN function (already done)
  async login(dto: DonorLoginDto) {
    const { email, password } = dto;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const donor = await this.prisma.donor.findUnique({
      where: { email },
    });

    if (!donor) {
      throw new NotFoundException('Donor not found with this email');
    }

    const isMatch = await bcrypt.compare(password, donor.passhash);
    if (!isMatch) {
      throw new BadRequestException('Invalid Password');
    }

    const access_token = await this.jwtService.signAsync({
      sub: donor.id,
      username: donor.username,
      role: 'DONOR',
    });

    await this.prisma.donorSession.create({
      data: {
        donor_id: donor.id,
        token: access_token,
      },
    });

    return {
      access_token,
      donor_id: donor.id,
      token_type: 'bearer',
      expires_in: process.env.JWT_EXPIRY || '3d',
    };
  }

  // REGISTER function
  async register(dto: CreateDonorAuthDto) {
    // Check if email already exists
    const existing = await this.prisma.donor.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException('Email already exists');
    }

    // Hash the password
    const passhash = await bcrypt.hash(dto.password, 10);

    // Create donor
    const donor = await this.prisma.donor.create({
      data: {
        username: dto.username,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        avatar: dto.avatar,
        passhash,
      },
    });

    // Generate JWT token
    const access_token = await this.jwtService.signAsync({
      sub: donor.id,
      username: donor.username,
      role: 'DONOR',
    });

    // Create session
    await this.prisma.donorSession.create({
      data: {
        donor_id: donor.id,
        token: access_token,
        expired_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      },
    });

    // Return token and donor info
    return {
      access_token,
      donor_id: donor.id,
      token_type: 'bearer',
      expires_in: process.env.JWT_EXPIRY || '3d',
      donor,
    };
  }

  // OPTIONAL: validate donor
  validate(donor: any) {
    return donor;
  }

  // OPTIONAL: logout
  async logout(auth_session: any) {
    await this.prisma.donorSession.update({
      where: { id: auth_session.id },
      data: { expired_at: new Date() },
    });

    return { message: 'Logged out successfully' };
  }

  async findOne(id: number) {
    console.log('Finding donor with ID:', id);
    return await this.prisma.donor.findUnique({
      where: { id },
    });
  }
}
