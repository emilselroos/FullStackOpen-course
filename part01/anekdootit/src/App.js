import React, { useState } from 'react';
import Anecdote from './components/Anecdote.js';

const App = () => {

  const [ selected, setSelected ] = useState(0);
  const [ points, setPoints ] = useState([ 0, 0, 0, 0, 0, 0, 0 ]);

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ];
  
  const handleClick = () => {
    let number = Math.floor(Math.random() * anecdotes.length);
    setSelected(number);
  }

  const handleVote = (selected) => {
    const copy = [ ...points ];
    copy[selected] = points[selected] + 1;
    setPoints(copy);
  }

  const getMostVotedKey = () => {
    const mostVotes = Math.max(...points);
    const key = points.indexOf(mostVotes);
    return key;
  }

  return (
    <div>

      <h1>Anecdote of the day</h1>
      <Anecdote selected={anecdotes[selected]} votes={points[selected]} />
      <button onClick={() => handleVote(selected)}>Vote this anecdote</button>
      <button onClick={() => handleClick()}>Get a new anecdote</button>

      <h1>Anecdote with most votes</h1>
      <Anecdote selected={anecdotes[getMostVotedKey()]} votes={points[getMostVotedKey()]} />

    </div>
  );
}

export default App;
