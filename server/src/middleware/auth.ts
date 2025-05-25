import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const authenticate = async (req: any) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwtSecret) as { id: string };
    return await prisma.user.findUnique({ where: { id: decoded.id } });
  } catch {
    return null;
  }
};

export function isAuthenticated(req: any, _res: any, _next: any): { id: string } {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Not authenticated');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwtSecret) as { id: string };
    req.user = decoded;
    return { id: decoded.id };
  } catch {
    throw new Error('Not authenticated');
  }
}


export const isAdmin = (
  req: { headers: { authorization?: string } },
  res: { status: (code: number) => { send: (msg: string) => void } },
  next: () => void
) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('Unauthorized');

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwtSecret) as { role?: string };
    if (decoded.role !== 'ADMIN') return res.status(403).send('Forbidden');
    next();
  } catch {
    res.status(401).send('Unauthorized');
  }
};

