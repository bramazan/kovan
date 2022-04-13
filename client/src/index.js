import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './components/App';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/client';
 
// Pass your GraphQL endpoint to uri
const client = new ApolloClient(
  { 
    uri: 'http://localhost:4000/graphql',
    fetchOptions: {
      credentials: 'include',
    },
    request: operation => {
      const token = localStorage.getItem('token');
      operation.setContext({
        headers: {
          authorization: token,
        },
      });
    }
 }
);
 
const ApolloApp = AppComponent => (
  <ApolloProvider client={client}>
    <AppComponent />
  </ApolloProvider>
);
 
render(ApolloApp(App), document.getElementById('root'));
