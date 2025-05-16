import { PrismaClient } from "@prisma/client";
import { isAuthenticated } from "../utils/auth";

const prisma = new PrismaClient();

export const availabilityResolvers = {
  Query: {
    getAvailability: async (_, { userId, month }) => {
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
    setAvailability: async (_, { date, isAvailable }, context) => {
      const user = isAuthenticated(context);
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
