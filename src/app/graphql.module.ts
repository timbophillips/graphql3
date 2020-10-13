import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

// see src/proxyconf.json
const uri = '/api';
// cannot make proxy work for hasura websockets so hardcode this const in
const wsURI = 'ws://localhost:8080/v1/graphql';

export function createApollo(httpLink: HttpLink) {
  // bastardised from https://www.apollographql.com/docs/angular/features/subscriptions/
  return {
    link:
      // Apollo function that returns different ApolloLink handlers for different requests
      split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        // if above test is true then its a subscription so it needs a WS
        new WebSocketLink({
          uri: wsURI,
          options: {
            reconnect: true,
          }
        }),
        // otherwise boring old HTTP will suffice
        httpLink.create({ uri }),
      ),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
