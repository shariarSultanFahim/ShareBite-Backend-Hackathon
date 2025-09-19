import { Injectable } from '@nestjs/common';
import { CreateDropDto } from './dto/create-drop.dto';
import { UpdateDropDto } from './dto/update-drop.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DropService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createDropDto: CreateDropDto) {
    return await this.prisma.$transaction(async (prisma) => {
      return await prisma.drop.create({
        data: {
          ...createDropDto,
          drop_type: createDropDto.drop_type as any, // Ensure enum compatibility
        },
      });
    });
  }
  async findAll(skip: number, take: number) {
    const where: Prisma.DropWhereInput = {};
    const [results, total] = await this.prisma.$transaction([
      this.prisma.drop.findMany({
        where,
        skip,
        take,
      }),
      this.prisma.drop.count({ where }),
    ]);

    return { results, total };
  }

  async findOne(id: number, skip: number, take: number) {
    const where: Prisma.DropWhereInput = { id };
    const [results, total] = await this.prisma.$transaction([
      this.prisma.drop.findMany({
        where,
        skip,
        take,
      }),
      this.prisma.drop.count({ where: { id } }),
    ]);

    return { results, total };
  }

  update(id: number, updateDropDto: UpdateDropDto) {
    return `This action updates a #${id} drop`;
  }

  remove(id: number) {
    return `This action removes a #${id} drop`;
  }
}
