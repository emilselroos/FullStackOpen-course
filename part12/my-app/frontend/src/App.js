import React, { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recommended from './components/Recommended';
import {
  gql, useQuery, useMutation, useSubscription, useApolloClient
} from '@apollo/client';

const BOOK_ADDED = gql`
subscription {
  bookAdded {
    title
  }
}
`;

const App = () => {
	const [ token, setToken ] = useState(null);
  const [page, setPage] = useState('authors');
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log('Subscription data: ', subscriptionData);
      alert('Uusi kirja: ' + subscriptionData.data.bookAdded.title)
    }
  })

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      
        {token !== null && (
          <>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => logout()}>logout</button>
          </>
        )}
        
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
      />

      <Recommended
          show={page === 'recommended'}
      />

    </div>
  )
}

export default App