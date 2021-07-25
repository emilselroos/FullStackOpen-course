import React from 'react';

const Person = ({ data, handleDelete }) => (
	<p>{data.name} / {data.number} / <button onClick={() => handleDelete(data.id)}>Delete</button></p>
);

export default Person;
