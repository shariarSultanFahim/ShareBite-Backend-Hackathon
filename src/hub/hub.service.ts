import { Injectable } from '@nestjs/common';
import { CreateHubDto } from './dto/create-hub.dto';
import { UpdateHubDto } from './dto/update-hub.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class HubService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHubDto: CreateHubDto) {
    return await this.prisma.$transaction(async (prisma) => {
      return await prisma.hub.create({
        data: {
          ...createHubDto,
        },
      });
    });
  }

  async findAll(skip: number, take: number) {
    const where: Prisma.HubWhereInput = {};
    const [results, total] = await this.prisma.$transaction([
      this.prisma.hub.findMany({
        where,
        skip,
        take,
        include: {
          hub_inventiry: true, // ✅ include hub_inventiry
        },
      }),
      this.prisma.hub.count({ where }),
    ]);

    return { results, total };
  }

  async findOne(id: number) {
    const hub = await this.prisma.hub.findUnique({
      where: { id },
      include: {
        hub_inventiry: true, // ✅ include hub_inventiry
      },
    });
    return hub;
  }

  update(id: number, updateHubDto: UpdateHubDto) {
    return `This action updates a #${id} hub`;
  }

  remove(id: number) {
    return `This action removes a #${id} hub`;
  }
}
