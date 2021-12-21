import React, { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client';

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      id
      author {
        name
      }
      genres
    }
  }
`;

const ME = gql`
query {
    me {
		username
		favoriteGenre
    }
  }
`;

const Recommended = (props) => {

  const books = useQuery(ALL_BOOKS, {
    pollInterval: 1000,
  });

  const user = useQuery(ME);

  if (!props.show) {
    return null;
  }

  if (books.loading || user.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>

      {user.data.me.favoriteGenre !== null && (
        <p>in your favorite genre <strong>{user.data.me.favoriteGenre}</strong></p>
      )}
      
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>

          {user.data.me.favoriteGenre !== null && (
            books.data.allBooks.filter(b => b.genres.includes(user.data.me.favoriteGenre)).map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )            
          )}

        </tbody>
      </table>
    </div>
  )   

}

export default Recommended