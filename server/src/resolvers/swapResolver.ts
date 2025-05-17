import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const shiftRequestSwapResolver = {
  Query: {
    myShiftRequests: async (_, __, { user }) => {
      return prisma.shiftRequest.findMany({
        where: { requesterId: user.id },
        include: { shift: true },
      });
    },
    myShiftSwaps: async (_, __, { user }) => {
      return prisma.shiftSwap.findMany({
        where: { proposerId: user.id },
        include: { fromShift: true, toShift: true },
      });
    },
  },

  Mutation: {
    requestShift: async (_, { input }, { user }) => {
      return prisma.shiftRequest.create({
        data: {
          shiftId: input.shiftId,
          requesterId: user.id,
        },
        include: { shift: true },
      });
    },

    proposeShiftSwap: async (_, { input }, { user }) => {
      return prisma.shiftSwap.create({
        data: {
          fromShiftId: input.fromShiftId,
          toShiftId: input.toShiftId,
          proposerId: user.id,
        },
        include: { fromShift: true, toShift: true },
      });
    },

    updateShiftRequestStatus: async (_, { id, status }, { user }) => {
      if (user.role !== 'ADMIN') throw new Error('Unauthorized');
      return prisma.shiftRequest.update({
        where: { id },
        data: { status },
      });
    },

    updateShiftSwapStatus: async (_, { id, status }, { user }) => {
      if (user.role !== 'ADMIN') throw new Error('Unauthorized');
      return prisma.shiftSwap.update({
        where: { id },
        data: { status },
      });
    },
  },
};
