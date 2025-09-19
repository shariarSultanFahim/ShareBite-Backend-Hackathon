import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HubService } from './hub.service';
import { CreateHubDto } from './dto/create-hub.dto';
import { UpdateHubDto } from './dto/update-hub.dto';
import { Paginated } from 'lib';
import { Skip } from 'lib/decorators/skip.decorator';
import { Take } from 'lib/decorators/take.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('hub')
export class HubController {
  constructor(private readonly hubService: HubService) {}

  @Post()
  create(@Body() createHubDto: CreateHubDto) {
    return this.hubService.create(createHubDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all hubs' })
  @ApiResponse({ status: 200, description: 'Success' })
  @Paginated()
  findAll(@Skip() skip: number, @Take() take: number) {
    return this.hubService.findAll(skip, take);
  }

  @Get('/all')
  findAllNoFilter(@Skip() skip: number, @Take() take: number) {
    return this.hubService.findAllNoFilter(skip, take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHubDto: UpdateHubDto) {
    return this.hubService.update(+id, updateHubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hubService.remove(+id);
  }
}
