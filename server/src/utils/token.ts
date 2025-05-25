import jwt from 'jsonwebtoken';
import { $Enums } from '@prisma/client';

export const generateAccessToken = (user: { id: string; role: $Enums.Role }) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error('JWT_SECRET not defined');

  return jwt.sign(
    { id: user.id, role: user.role },
    jwtSecret,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' } as jwt.SignOptions 
  );
};

export const generateRefreshToken = (user: { id: string }) => {
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
  if (!refreshSecret) throw new Error('REFRESH_TOKEN_SECRET not defined');

  return jwt.sign(
    { id: user.id },
    refreshSecret,
    { expiresIn: process.env.REFRESH_EXPIRES_IN || '7d' } as jwt.SignOptions
  );
};
