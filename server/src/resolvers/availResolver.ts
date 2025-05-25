import { PrismaClient } from "@prisma/client";
import { isAuthenticated } from "../middleware/auth";

const prisma = new PrismaClient();

export const availabilityResolvers = {
  Query: {
    getAvailability: async (
      _: unknown,
      args: { userId: string; month: string }
    ) => {
      const { userId, month } = args;
      const start = new Date(`${month}-01`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);

      return prisma.availability.findMany({
        where: {
          userId,
          date: {
            gte: start,
            lt: end,
          },
        },
      });
    },
  },
  Mutation: {
    setAvailability: async (
      _: unknown,
      args: { date: string; isAvailable: boolean },
      context: any
    ) => {
      const { date, isAvailable } = args;
      const user = isAuthenticated(context.req, context.res, context.next);
      const parsedDate = new Date(date);

      return prisma.availability.upsert({
        where: {
          userId_date: {
            userId: user.id,
            date: parsedDate,
          },
        },
        update: {
          isAvailable,
        },
        create: {
          userId: user.id,
          date: parsedDate,
          isAvailable,
        },
      });
    },
  },
};
