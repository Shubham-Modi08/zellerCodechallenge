import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { awsconfig } from '../aws-exports';

const httpLink = createHttpLink({ uri: awsconfig.aws_appsync_graphqlEndpoint });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'x-api-key': awsconfig.aws_appsync_apiKey,
    },
  }));
  return forward(operation);
});

export const client = new ApolloClient({
  link: ApolloLink.from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});
