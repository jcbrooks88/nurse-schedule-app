import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response, Application } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware, ExpressContextFunctionArgument } from '@apollo/server/express4';
import { typeDefs } from './schemas/typeDefs';
import { resolvers } from './utils/mergeResolvers';
import { authenticate } from './middleware/auth';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bodyParser from 'body-parser';
import { generateAccessToken, generateRefreshToken } from './utils/token';

interface MyContext {
  req: Request;
  res: Response;
  user: any | null;
}

const prisma = new PrismaClient();
const app: Application = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

/**
 * Express route for refreshing tokens
 */
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
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return res.send({ ok: true, accessToken: newAccessToken });
  } catch (err) {
    console.error('Refresh token error:', err);
    return res.send({ ok: false, accessToken: '' });
  }
});

/**
 * Express route for logging out
 */
app.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('jid', { path: '/refresh-token' });
  res.send({ ok: true });
});

const startServer = async () => {
  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    '/graphql',
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }: ExpressContextFunctionArgument): Promise<MyContext> => {
        const user = await authenticate(req);
        if (user) {
          console.log('Authenticated user:', user);
        }
        return { req, res, user };
      },
    })
  );

  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
  });
};

startServer();
