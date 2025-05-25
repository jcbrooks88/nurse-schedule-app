import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/token';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

export const authResolver = {
  Mutation: {
    addUser: async (
      _: unknown,
      { email, password }: { email: string; password: string },
    ) => {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name: email },
      });

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      return { accessToken, refreshToken, user }; // Set cookie in plugin
    },

    login: async (
      _: unknown,
      { email, password }: { email: string; password: string },
    ) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      return { accessToken, refreshToken, user }; // Set cookie in plugin
    },

    refreshToken: async (
      _: unknown,
      { token }: { token: string }
    ) => {
      try {
        const decoded = jwt.verify(
          token,
          process.env.REFRESH_TOKEN_SECRET!
        ) as jwt.JwtPayload;

        const user = await prisma.user.findUnique({
          where: { id: decoded.id as string },
        });

        if (!user) throw new Error('User not found');

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return { accessToken, refreshToken, user };
      } catch {
        throw new Error('Invalid refresh token');
      }
    },
  },

  Query: {
    me: async (
      _: unknown,
      __: unknown,
      context: { user?: { id: string } }
    ) => {
      if (!context.user) throw new Error('Not authenticated');

      const user = await prisma.user.findUnique({
        where: { id: context.user.id },
        include: {
          assignedShifts: true,
          shiftRequests: { include: { shift: true } },
        },
      });

      if (!user) throw new Error('User not found');
      return user;
    },
  },
};
