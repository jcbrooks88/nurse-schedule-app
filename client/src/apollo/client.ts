// src/apollo/client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000/graphql', credentials: 'include' }),
  cache: new InMemoryCache(),
});

export default client;
