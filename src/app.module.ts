import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { DonorAuthModule } from './donor-auth/donor-auth.module';
import { DropModule } from './drop/drop.module';
import { HubModule } from './hub/hub.module';

@Module({
  imports: [PrismaModule, AdminModule, AuthModule, DonorAuthModule, DropModule, HubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
