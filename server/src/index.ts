import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import { authenticate } from './middleware/auth.ts';
import { typeDefs } from './schemas/typeDefs.ts';
import { resolvers } from './utils/mergeResolvers.ts';

dotenv.config();

const app = express();

// ✅ Proper CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true,               // allow cookies/auth headers
}));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    user: await authenticate(req),
  }),
});

// Start Apollo Server
await server.start();

// ✅ Allow CORS credentials in Apollo middleware too
server.applyMiddleware({
  app,
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
});
