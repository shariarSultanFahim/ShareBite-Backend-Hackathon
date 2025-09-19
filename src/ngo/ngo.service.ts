import { Injectable } from '@nestjs/common';
import { CreateNgoDto } from './dto/create-ngo.dto';
import { UpdateNgoDto } from './dto/update-ngo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class NgoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNgoDto: CreateNgoDto) {
    return this.prisma.$transaction(async (prisma) => {
      return await prisma.ngo.create({
        data: { ...createNgoDto },
      });
    });
  }

  async findAll(skip: number, take: number) {
    const where: Prisma.NgoWhereInput = {};
    const [results, total] = await this.prisma.$transaction([
      this.prisma.ngo.findMany({
        where,
        skip,
        take,
      }),
      this.prisma.ngo.count({ where }),
    ]);

    return { results, total };
    //
  }

  findOne(id: number) {
    return `This action returns a #${id} ngo`;
  }

  update(id: number, updateNgoDto: UpdateNgoDto) {
    return `This action updates a #${id} ngo`;
  }

  remove(id: number) {
    return `This action removes a #${id} ngo`;
  }
}
