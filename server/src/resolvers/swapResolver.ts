import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const shiftRequestSwapResolver = {
  Query: {
    myShiftRequests: async (_: any, __: any, { user }: any) => {
      return prisma.shiftRequest.findMany({
        where: { requesterId: user.id },
        include: { shift: true },
      });
    },
    myShiftSwaps: async (_: any, __: any, { user }: any) => {
      return prisma.shiftSwap.findMany({
        where: { proposerId: user.id },
        include: { fromShift: true, toShift: true },
      });
    },
  },

  Mutation: {
    requestShift: async (_: any, { input }: any, { user }: any) => {
      return prisma.shiftRequest.create({
        data: {
          shiftId: input.shiftId,
          requesterId: user.id,
        },
        include: { shift: true },
      });
    },

    proposeShiftSwap: async (_: any, { input }: any, { user }: any) => {
      return prisma.shiftSwap.create({
        data: {
          fromShiftId: input.fromShiftId,
          toShiftId: input.toShiftId,
          proposerId: user.id,
        },
        include: { fromShift: true, toShift: true },
      });
    },

    updateShiftRequestStatus: async (_: any, { id, status }: any, { user }: any) => {
      if (user.role !== 'ADMIN') throw new Error('Unauthorized');
      return prisma.shiftRequest.update({
        where: { id },
        data: { status },
      });
    },

    updateShiftSwapStatus: async (_: any, { id, status }: any, { user }: any) => {
      if (user.role !== 'ADMIN') throw new Error('Unauthorized');
      return prisma.shiftSwap.update({
        where: { id },
        data: { status },
      });
    },
  },
};
