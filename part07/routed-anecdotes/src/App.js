import React, { useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import Menu from './components/Menu.js';
import Footer from './components/Footer.js';
import Anecdote from './components/Anecdote.js';
import AnecdoteList from './components/AnecdoteList.js';
import About from './components/About.js';
import Notification from './components/Notification.js';
import CreateNew from './components/CreateNew.js';

const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ]);

  const [ notification, setNotification ] = useState('');
  const history = useHistory();

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setNotification('You created a new anecdote "' + anecdote.content + '"')
    setAnecdotes(anecdotes.concat(anecdote));
    history.push('/');
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />

      {notification !== '' && (
        <Notification message={notification} setNotification={setNotification} />
      )}

      <Switch>
        <Route exact path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
        <Route path="/anecdotes/:id">
          <Anecdote anecdotes={anecdotes} />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
      </Switch>

      <Footer />
    </div>
  )
}

export default App;