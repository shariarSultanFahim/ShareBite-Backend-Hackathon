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
  async findAllNoFilter(skip: number, take: number) {
    const where: Prisma.DropWhereInput = {};
    const [results, total] = await this.prisma.$transaction([
      this.prisma.drop.findMany({
        where,
        skip,
        take,
        include: {
          donor: true,
          acceptedByAdmin: true,
          assignedToRider: true,
          rejectedByAdmin: true,
        },
      }),
      this.prisma.drop.count({ where }),
    ]);
    return { results, total };
  }
  async findAll(id: number | null, skip: number, take: number) {
    // Build the where filter dynamically
    const where: Prisma.DropWhereInput = id ? { donor_id: id } : {};

    const [results, total] = await this.prisma.$transaction([
      this.prisma.drop.findMany({
        where,
        skip,
        take,
        include: {
          donor: true,
          acceptedByAdmin: true,
          assignedToRider: true,
          rejectedByAdmin: true,
        },
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
        include: {
          donor: true,
          acceptedByAdmin: true,
          assignedToRider: true,
          rejectedByAdmin: true,
        },
      }),
      this.prisma.drop.count({ where: { id } }),
    ]);

    return { results, total };
  }

  async acceptDrop(dropId: number, hubId: number, adminId: number) {
    return this.prisma.$transaction(async (tx) => {
      const drop = await tx.drop.update({
        where: { id: dropId },
        data: { status: 'ACCEPTED', accepted_by: adminId },
      });

      await tx.hub_Inventory.create({
        data: {
          type: 'In',
          person_for: drop.assumed_person_for,
          remarks: drop.description,
          reference_id: drop.id,
          hub_id: hubId,
          is_transferred: false,
        },
      });

      return drop;
    });
  }

  update(id: number, updateDropDto: UpdateDropDto) {
    return `This action updates a #${id} drop`;
  }

  remove(id: number) {
    return `This action removes a #${id} drop`;
  }
}
