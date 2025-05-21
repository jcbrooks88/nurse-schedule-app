import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from '../utils/token.ts';
import { PrismaClient } from '@prisma/client';
import { AuthenticationError } from 'apollo-server-express';

const prisma = new PrismaClient();

export const authResolver = {
  Mutation: {
    addUser: async (_, { name, email, password }) => {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });
        if (existingUser) {
          throw new Error('User with this email already exists.');
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return {
          accessToken,
          refreshToken,
          user,
        };
      } catch (err) {
        console.error('Registration failed:', err);
        throw new Error('Registration failed. Please try again.');
      }
    },

    login: async (_, { email, password }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      return { accessToken, refreshToken, user };
    },

    refreshToken: async (_, { token }) => {
      try {
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
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
    me: async (_, __, context) => {
      if (!context.user) throw new AuthenticationError('Not authenticated');
      return await prisma.user.findUnique({
        where: { id: context.user.id },
        include: {
          assignedShifts: true,
          shiftRequests: {
            include: { shift: true },
          },
        },
      });
    },
  },
};
