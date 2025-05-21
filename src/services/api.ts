import {
 ApolloClient,
 InMemoryCache,
 HttpLink,
 ApolloLink,
} from '@apollo/client';
import {awsconfig} from '../aws-exports';

const httpLink = new HttpLink({
 uri: awsconfig.aws_appsync_graphqlEndpoint,
});

const authLink = new ApolloLink((operation, forward) => {
 operation.setContext({
   headers: {
     'x-api-key': awsconfig.aws_appsync_apiKey,
   },
 });
 return forward(operation);
});

export const client = new ApolloClient({
 link: authLink.concat(httpLink),
 cache: new InMemoryCache(),
});
