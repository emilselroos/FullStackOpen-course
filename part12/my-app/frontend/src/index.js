import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { setContext } from 'apollo-link-context';

import {
	ApolloClient, ApolloProvider, HttpLink, InMemoryCache,
	split
} from '@apollo/client';

import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

const BACKEND_URL = process.env.BACKEND_URL || 'localhost:4000';

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('user-token');
	return {
	  headers: {
		...headers,
		authorization: token ? `bearer ${token}` : null,
	  }
	}
});

const wsLink = new WebSocketLink({
	uri: `ws://${BACKEND_URL}/graphql`,
	options: {
	  reconnect: true
	}
});

const httpLink = new HttpLink({
	uri: `http://${BACKEND_URL}`
});

const splitLink = split(
	({ query }) => {
	  const definition = getMainDefinition(query)
	  return (
		definition.kind === 'OperationDefinition' &&
		definition.operation === 'subscription'
	  )
	},
	wsLink,
	authLink.concat(httpLink),
);

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: splitLink,
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);