import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NgoService } from './ngo.service';
import { CreateNgoDto } from './dto/create-ngo.dto';
import { UpdateNgoDto } from './dto/update-ngo.dto';
import { Paginated } from 'lib';
import { Skip } from 'lib/decorators/skip.decorator';
import { Take } from 'lib/decorators/take.decorator';

@Controller('ngo')
export class NgoController {
  constructor(private readonly ngoService: NgoService) {}

  @Post()
  create(@Body() createNgoDto: CreateNgoDto) {
    return this.ngoService.create(createNgoDto);
  }

  @Get()
  @Paginated()
  findAll(@Skip() skip: number, @Take() take: number) {
    return this.ngoService.findAll(skip, take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ngoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNgoDto: UpdateNgoDto) {
    return this.ngoService.update(+id, updateNgoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ngoService.remove(+id);
  }
}
