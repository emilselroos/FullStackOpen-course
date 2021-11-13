import React from 'react';

const Search = ({ searchTerm, handleSearchChange }) => (
	<div>
		Search: <input value={searchTerm} onChange={handleSearchChange} />
	</div>
);

export default Search;
