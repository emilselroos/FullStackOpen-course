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

const Books = (props) => {

  const [ genre, setGenre ] = useState(null);
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 1000,
  });


  if (!props.show) {
    return null;
  }

  if (books.loading) {
    return <div>loading...</div>;
  }

  if (!books.loading) {
    console.log(books)
    const genres = [];
    books.data.allBooks.forEach(el => {
      
      el.genres.forEach(gen => {
        if (!genres.includes(gen)) {
          genres.push(gen)
        }
      })
    });

  return (
    <div>
      <h2>books</h2>
      {genre !== null && (
        <p>in genre <strong>{genre}</strong></p>
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
          {genre === null && (
            books.data.allBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )            
          )}

          {genre !== null && (
            books.data.allBooks.filter(b => b.genres.includes(genre)).map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )            
          )}

        </tbody>
      </table>

      <div>
        <button onClick={() => setGenre(null)}>all genres</button>
        {genres.map(g => (
              <button onClick={() => setGenre(g)}>{g}</button>

        ))}
      </div>
    </div>
  )    
  }

}

export default Books