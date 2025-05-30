import { PrismaClient, RequestStatus, ShiftStatus } from '@prisma/client';
import { IResolvers } from '@graphql-tools/utils';

const prisma = new PrismaClient();

const adminResolvers: IResolvers = {
  Query: {
    getPendingRequests: async () => {
      try {
        const pendingRequests = await prisma.shiftRequest.findMany({
          where: { status: RequestStatus.PENDING },
          include: {
            requester: true,
            shift: true,
          },
        });
        return pendingRequests;
      } catch (error) {
        console.error("Error fetching pending requests:", error);
        return [];
      }
    },
  },

  Mutation: {
    approveShiftRequest: async (_parent: any, { requestId }: any) => {
      const request = await prisma.shiftRequest.findUnique({
        where: { id: requestId },
        include: { shift: true, requester: true },
      });

      if (!request) throw new Error('Shift request not found');
      if (request.status !== RequestStatus.PENDING)
        throw new Error('Only pending requests can be approved');

      const updatedRequest = await prisma.shiftRequest.update({
        where: { id: requestId },
        data: {
          status: RequestStatus.CONFIRMED,
          shift: {
            update: {
              assignedToId: request.requesterId,
              status: ShiftStatus.CONFIRMED,
            },
          },
        },
        include: {
          requester: true,
          shift: true,
        },
      });

      return updatedRequest;
    },

    rejectShiftRequest: async (_parent: any, { requestId }: any) => {
      const request = await prisma.shiftRequest.findUnique({
        where: { id: requestId },
      });

      if (!request) throw new Error('Shift request not found');
      if (request.status !== RequestStatus.PENDING)
        throw new Error('Only pending requests can be rejected');

      await prisma.shiftRequest.update({
        where: { id: requestId },
        data: { status: RequestStatus.REJECTED },
      });

      return true;
    },
  },
};

export default adminResolvers;
