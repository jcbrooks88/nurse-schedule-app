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
        where: {
          status: { not: "CANCELLED" },
        },
        orderBy: { start: 'asc' },
      });
    },
  },

  Mutation: {
    createShift: async (
      _: any,
      { input }: { input: { [key: string]: any } },
      { user }: { user: { id: string; role: string } }
    ) => {
      if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
      return await prisma.shift.create({
        data: {
          title: input.title,
          start: input.start,
          end: input.end,
          // include any other required fields here
          ...input,
          createdById: user.id,
        },
      });
    },

    updateShift: async (_: any, { id, input }: any, { user }: any) => {
      if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
      return await prisma.shift.update({
        where: { id },
        data: input,
      });
    },

    deleteShift: async (_: any, { id }: any, { user }: any) => {
      if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
      return await prisma.shift.delete({ where: { id } });
    },

    requestShift: async (_: any, { shiftId }: any, { user, prisma }: any) => {
      if (!user) throw new Error("Not authenticated");

      return prisma.shiftRequest.create({
      data: {
        shiftId,
        requesterId: user.id,
      },
    });
  },
  },
};
