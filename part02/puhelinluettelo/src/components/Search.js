import React from 'react';

const Search = ({ searchTerm, onChange }) => (
	<div>
		Search: <input value={searchTerm} onChange={onChange} />
	</div>
);

export default Search;
