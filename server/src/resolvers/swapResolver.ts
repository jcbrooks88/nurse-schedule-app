import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const shiftRequestSwapResolver = {
  Query: {
    myShiftRequests: async (_: any, __: any, { user }: any) => {
      if (!user) {
        throw new Error("Unauthorized");
      }
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

    getPendingRequests: async (_parent: any, _args: any, { prisma }: any) => {
      return await prisma.shiftRequest.findMany({
        where: { status: 'PENDING' },
        include: {
        requester: true,
        shift: true,
        },
      });
    },

  Mutation: {
    requestShift: async (_: any, { input }: any, { user }: any) => {
      if (!user) throw new Error('Not authenticated');
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
      if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
      return prisma.shiftRequest.update({
        where: { id },
        data: { status },
      });
    },

    updateShiftSwapStatus: async (_: any, { id, status }: any, { user }: any) => {
      if (!user || user.role !== 'ADMIN') throw new Error('Unauthorized');
      return prisma.shiftSwap.update({
        where: { id },
        data: { status },
      });
    },

    cancelShiftRequest: async (_: any, { id }: any, { user }: any) => {
      const request = await prisma.shiftRequest.findUnique({
        where: { id },
        include: { requester: true, shift: true },
      });

      if (!request) throw new Error('Shift request not found');
      if (request.requesterId !== user.id && user.role !== 'ADMIN') {
        throw new Error('Unauthorized');
      }

      if (request.status !== 'PENDING') {
        throw new Error('Only pending requests can be cancelled');
      }

      return prisma.shiftRequest.update({
        where: { id },
        data: { status: 'CANCELLED' },
        include: { shift: true },
      });
    },
  },
};
