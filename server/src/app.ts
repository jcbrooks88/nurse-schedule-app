//import express from 'express';
import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { generateAccessToken, generateRefreshToken } from './utils/token';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
//const app = express();
const app: Application = express();


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.post('/refresh-token', async (req: Request, res: Response) => {
  const token = req.cookies.jid;
  if (!token) return res.send({ ok: false, accessToken: '' });

  try {
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as jwt.JwtPayload;

    const user = await prisma.user.findUnique({ where: { id: payload.id as string } });
    if (!user) throw new Error('User not found');

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.cookie('jid', newRefreshToken, {
      httpOnly: true,
      path: '/refresh-token',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.send({ ok: true, accessToken: newAccessToken });
  } catch (err) {
    console.error("Refresh token error:", err);
    return res.send({ ok: false, accessToken: '' });
  }
});

app.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('jid', { path: '/refresh-token' });
  res.send({ ok: true });
});

export { app };
