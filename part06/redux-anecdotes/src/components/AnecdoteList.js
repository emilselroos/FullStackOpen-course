import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {

	const dispatch = useDispatch();
	const filter = useSelector(state => state.filter);
	const anecdotes = useSelector(state => Object(state.anecdotes).sort( (a,b) => (a.votes < b.votes) ? 1 : (b.votes < a.votes) ? -1 : 0));

	console.log(filter)

	useEffect(() => {}, [filter]);

	const handleVote = (anecdote) => {
		dispatch(vote(anecdote));
		dispatch(setNotification(`You created a new anecdote "${anecdote.content}"`, 5));
	}

	return (
	  <div>
		{anecdotes.filter(anecdote => anecdote.content.includes(filter)).map(anecdote =>
		  <div key={anecdote.id}>
			<div>
			  {anecdote.content}
			</div>
			<div>
			  has {anecdote.votes}
			  <button onClick={ () => handleVote(anecdote) }>vote</button>
			</div>
		  </div>
		)}
	  </div>
	)
}
  
export default AnecdoteList;
