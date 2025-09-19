import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { DropService } from './drop.service';
import { CreateDropDto } from './dto/create-drop.dto';
import { UpdateDropDto } from './dto/update-drop.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Paginated } from 'lib';
import { Skip } from 'lib/decorators/skip.decorator';
import { Take } from 'lib/decorators/take.decorator';
import { AcceptDropDto } from './dto/accept-drop.dto';
import { UpdateDropStatusDto } from './dto/update-drop-status.dto';

@ApiTags('Drops')
@Controller('drop')
// @ApiBearerAuth()
// @UseGuards(AuthGuard)
export class DropController {
  constructor(private readonly dropService: DropService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new drop' })
  @ApiResponse({ status: 201, description: 'Drop successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createDropDto: CreateDropDto) {
    console.log('Creating drop with data:', createDropDto);
    return this.dropService.create(createDropDto);
  }
  @Get()
  @ApiOperation({ summary: 'Get all drops' })
  @ApiResponse({
    status: 200,
    description: 'List of drops returned successfully.',
  })
  @Paginated()
  async findAllNoFilter(@Skip() skip: number, @Take() take: number) {
    return await this.dropService.findAll(null, skip, take);
  }

  @Get('donor/:id')
  @ApiOperation({ summary: 'Get all drops' })
  @ApiResponse({
    status: 200,
    description: 'List of drops returned successfully.',
  })
  @Paginated()
  async findAll(
    @Param('id') id: string,
    @Skip() skip: number,
    @Take() take: number,
  ) {
    return await this.dropService.findAll(+id, skip, take);
  }

  @Get(':id')
  // @Public()
  @ApiOperation({ summary: 'Get drop by ID' })
  @ApiResponse({ status: 200, description: 'Drop returned successfully.' })
  @ApiResponse({ status: 404, description: 'Drop not found.' })
  @Paginated()
  async findOne(
    @Param('id') id: string,
    @Skip() skip: number,
    @Take() take: number,
  ) {
    return await this.dropService.findOne(+id, skip, take);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a drop by ID' })
  @ApiResponse({ status: 200, description: 'Drop updated successfully.' })
  @ApiResponse({ status: 404, description: 'Drop not found.' })
  update(@Param('id') id: string, @Body() updateDropDto: UpdateDropDto) {
    return this.dropService.update(+id, updateDropDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a drop by ID' })
  @ApiResponse({ status: 200, description: 'Drop deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Drop not found.' })
  remove(@Param('id') id: string) {
    return this.dropService.remove(+id);
  }

  @Post(':id/accept')
  @ApiOperation({ summary: 'Accept a drop and assign it to a hub' })
  @ApiResponse({
    status: 200,
    description:
      'Drop accepted successfully and inventory record created in hub.',
  })
  @ApiResponse({ status: 404, description: 'Drop or Hub not found.' })
  acceptDrop(@Param('id') id: string, @Body() body: AcceptDropDto) {
    return this.dropService.acceptDrop(+id, body.hubId, body.adminId);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) dropId: number,

    @Body() body: UpdateDropStatusDto,
  ) {
    const { status, adminId, hubId } = body;
    return this.dropService.updateStatus(dropId, status, adminId, hubId);
  }
}
