import { PrismaClient } from '@prisma/client';
import { isAuthenticated } from '../middleware/auth';

const prisma = new PrismaClient();

export const availabilityResolver = {
  Query: {
    getAvailability: async (_: unknown, { userId, month }: { userId: string; month: string }) => {
      const start = new Date(`${month}-01`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);

      return prisma.availability.findMany({
        where: {
          userId,
          date: { gte: start, lt: end },
        },
      });
    },
  },

  Mutation: {
    setAvailability: async (_: unknown, { date, isAvailable }: { date: string; isAvailable: boolean }, context: any) => {
      const user = isAuthenticated(context.req, context.res, context.next);
      const parsedDate = new Date(date);

      return prisma.availability.upsert({
        where: {
          userId_date: {
            userId: user.id,
            date: parsedDate,
          },
        },
        update: { isAvailable },
        create: {
          userId: user.id,
          date: parsedDate,
          isAvailable,
        },
      });
    },
  },
};
