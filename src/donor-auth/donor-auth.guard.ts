// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
// import { PrismaService } from 'src/prisma/prisma.service';

// @Injectable()
// export class DonorAuth implements CanActivate {
//   constructor(
//     private jwtService: JwtService,
//     private prisma: PrismaService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = this.extractTokenFromHeader(request);
//     if (!token) {
//       throw new UnauthorizedException();
//     }
//     try {
//       const payload = await this.jwtService.verifyAsync(token, {
//         secret: process.env.JWT_SECRET,
//       });

//       const auth_session = await this.prisma.donorSession.findUnique({
//         where: {
//           donor_id: payload.sub,
//           token,
//         },
//       });

//       if (!auth_session) {
//         throw new UnauthorizedException('Invalid token');
//       }

//       if (auth_session.expired_at) {
//         throw new UnauthorizedException(
//           `Token expired at ${auth_session.expired_at?.toISOString()}`,
//         );
//       }

//       const user = await this.prisma.donor.findUnique({
//         where: {
//           id: payload.sub,
//         },
//         select: {
//           id: true,
//           email: true,
//           username: true,

//           //   profile: {
//           //     select: {
//           //       first_name: true,
//           //       last_name: true,
//           //       bio: true,
//           //       secondary_email: true,
//           //       phone: true,
//           //       secondary_phone: true,
//           //       address: true,
//           //       secondary_address: true,
//           //       dob: true,
//           //       created_at: true,
//           //       updated_at: true,
//           //     },
//           //   },
//           created_at: true,
//           updated_at: true,
//         },
//       });

//       if (!user) {
//         throw new UnauthorizedException("User doesn't exist");
//       }

//       request['user'] = user;
//       request['donor_sesion'] = auth_session;
//     } catch {
//       throw new UnauthorizedException();
//     }
//     return true;
//   }

//   private extractTokenFromHeader(request: Request): string | undefined {
//     const [type, token] = request.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
// }

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DonorAuth implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // Verify JWT
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const auth_session = await this.prisma.donorSession.findUnique({
        where: {
          donor_id: payload.sub,
          token,
        },
      });

      // Check donor session (use findFirst for multiple fields)

      if (!auth_session) {
        throw new UnauthorizedException('Invalid token or session');
      }

      if (auth_session.expired_at && auth_session.expired_at < new Date()) {
        throw new UnauthorizedException(
          `Token expired at ${auth_session.expired_at}`,
        );
      }

      // Fetch donor info
      const donor = await this.prisma.donor.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          email: true,
          username: true,
          created_at: true,
          updated_at: true,
        },
      });

      if (!donor) {
        throw new UnauthorizedException("Donor doesn't exist");
      }

      // Attach donor & session to request
      request['user'] = donor;
      request['donor_session'] = auth_session;
    } catch (err) {
      console.log('JWT or session error:', err);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
