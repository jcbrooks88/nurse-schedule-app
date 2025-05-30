import jwt, { SignOptions } from 'jsonwebtoken';
import { $Enums } from '@prisma/client';

export const generateAccessToken = (user: { id: string; role: $Enums.Role }) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) throw new Error('JWT_SECRET not defined');

  const expiresIn = (process.env.JWT_EXPIRES_IN || '240m') as SignOptions['expiresIn'];

  return jwt.sign(
    { id: user.id, role: user.role },
    jwtSecret,
    { expiresIn }
  );
};

export const generateRefreshToken = (user: { id: string }) => {
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
  if (!refreshSecret) throw new Error('REFRESH_TOKEN_SECRET not defined');

  const expiresIn = (process.env.REFRESH_EXPIRES_IN || '7d') as SignOptions['expiresIn'];

  return jwt.sign(
    { id: user.id },
    refreshSecret,
    { expiresIn }
  );
};
