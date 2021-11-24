import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import Select from 'react-select';

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`;

const UPDATE_AUTHOR = gql`
mutation updateAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name,
    born
  }
}
`;

const Authors = (props) => {

  const [ name, setName ] = useState('');
  const [ born, setBorn ] = useState('');

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR);

  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 1000,
  });

  if (!props.show) {
    return null;
  }

  if (authors.loading) {
    return <div>loading...</div>;
  }

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name: name, setBornTo: Number(born) } })
      .catch(error => {
        console.log(error)
        alert(error)
      });

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>

        name
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authors.data.allAuthors.map(a => <option value={a.name}>{a.name}</option>)}
        </select>

        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors