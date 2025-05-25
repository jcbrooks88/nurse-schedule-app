import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'http://localhost:5001/graphql',
  credentials: 'include', // for cookies if using refresh tokens, but optional with Authorization header
});

// Middleware to add the Authorization header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// Apollo client setup
const client = new ApolloClient({
  link: authLink.concat(httpLink), // auth link comes first
  cache: new InMemoryCache(),
});

export default client;
