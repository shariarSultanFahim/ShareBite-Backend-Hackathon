import { Module } from '@nestjs/common';
import { NgoService } from './ngo.service';
import { NgoController } from './ngo.controller';

@Module({
  controllers: [NgoController],
  providers: [NgoService],
})
export class NgoModule {}
