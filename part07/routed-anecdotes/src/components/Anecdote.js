import { useParams } from 'react-router-dom';

const Anecdote = ({ anecdotes }) => {

	const id = useParams().id;
	const anecdoteById = (id) => anecdotes.find(a => a.id === id);
	const anecdote = anecdoteById(id);

	return (
		<div>
			<h2>{anecdote.content}</h2>

			<p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
			<p>{anecdote.author}</p>
			<p>Has {anecdote.votes} votes.</p>

		</div>
	);
};

export default Anecdote;