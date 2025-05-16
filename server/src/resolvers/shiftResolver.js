import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const shiftResolver = {
  Query: {
    shifts: async () => {
      return await prisma.shift.findMany({
        include: {
          createdBy: true,
          assignedTo: true,
        },
      });
    },
  },

  Mutation: {
    createShift: async (_, { input }, { user }) => {
      if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
      return await prisma.shift.create({
        data: {
          ...input,
          createdById: user.id,
        },
      });
    },

    updateShift: async (_, { id, input }, { user }) => {
      if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
      return await prisma.shift.update({
        where: { id },
        data: input,
      });
    },

    deleteShift: async (_, { id }, { user }) => {
      if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
      return await prisma.shift.delete({ where: { id } });
    },
  },
};
