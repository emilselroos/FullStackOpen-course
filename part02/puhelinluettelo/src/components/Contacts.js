import React from 'react';
import Person from './Person';

const Contacts = ({ contacts, searchTerm, handleDelete }) => (
	<>
		{contacts.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase())).map(person => (
			<Person key={person.name} data={person} handleDelete={handleDelete} /> 
		))}
	</>
);

export default Contacts;
