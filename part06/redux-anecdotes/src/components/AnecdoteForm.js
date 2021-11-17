import React from 'react';
import { connect } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {

	const dispatch = useDispatch();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';
		dispatch(createAnecdote(content));
		dispatch(setNotification(`You created a new anecdote "${content}"`, 5));
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={ (event) => handleSubmit(event) }>
				<div><input name="anecdote" type="text" /></div>
				<button>create</button>
			</form>
	  	</div>
	);
};

const mapStateToProps = (state) => {
	return {
	  
	}
  }

const ConnectedAnecdoteForm = connect(mapStateToProps)(AnecdoteForm);
export default ConnectedAnecdoteForm;
