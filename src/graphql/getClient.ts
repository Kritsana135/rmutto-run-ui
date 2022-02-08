import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { api_path } from '../config';
import { getAccessToken } from '../utils/accessToken';

// const httpLink = createHttpLink({
//   uri: api_path,
//   credentials: 'include'
// });

const httpLink = createUploadLink({
  uri: api_path,
  credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      authorization: token || ''
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
