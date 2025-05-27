import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const shiftResolver = {
  Query: {
    shifts: async () => {
      return prisma.shift.findMany({
        where: { status: { not: 'CANCELLED' } },
        include: {
          createdBy: true,
          assignedTo: true,
        },
        orderBy: { start: 'asc' },
      });
    },
  },

  Mutation: {
    createShift: async (_: any, { input }: any, { user }: any) => {
      if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
      return prisma.shift.create({
        data: {
          ...input,
          createdById: user.id,
        },
      });
    },

    updateShift: async (_: any, { id, input }: any, { user }: any) => {
      if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
      return prisma.shift.update({
        where: { id },
        data: input,
      });
    },

    deleteShift: async (_: any, { id }: any, { user }: any) => {
      if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
      return prisma.shift.delete({
        where: { id },
      });
    },
  },
};
