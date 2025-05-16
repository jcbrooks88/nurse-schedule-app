import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemas/typeDefs.js';
import { authResolver } from './resolvers/authResolver.js';
import { authenticate } from './middleware/auth.js';

dotenv.config();
const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers: [authResolver],
  context: async ({ req }) => ({ user: await authenticate(req) }),
});

await server.start();
server.applyMiddleware({ app });

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
});
