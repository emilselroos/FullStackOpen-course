import React from 'react';

const Anecdote = ({ selected, votes }) => (
	<p>{selected}
	<br/><br/>
	Has {votes} votes.</p>
);

export default Anecdote;
