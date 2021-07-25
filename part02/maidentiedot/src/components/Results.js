import React from 'react';
import Wheather from './Wheather';

const Results = ({ countries, searchTerm, setSearchTerm }) => {
	const sortedResults = countries.filter(country => {
		return country.name.toLowerCase().includes(searchTerm.toLowerCase());
	});
	const total = sortedResults.length;

	// console.log(searchTerm);
	// console.log(countries);
	// console.log(sortedResults);

	if (total === 1) {
		// console.log('Only one result to show.')
		return (
			<div>
				{sortedResults.map(result => (
					<div key={result.name}>
						<h3>{result.name}</h3>
						<p>Capital: {result.capital}</p>
						<p>Population: {result.population}</p>
						<p><b>Languages</b></p>
						<ul>
							{result.languages.map(lang => (
								<li key={lang.name}>{lang.name}</li>
							))}
						</ul>
						<img src={result.flag} width='300' alt={result.name} />
						<Wheather city={result.capital} />
					</div>
				))}
			</div>
		);
	}

	if (total > 1 && total <= 10) {
		// console.log('Only one result to show.')
		return (
			<div>
				{sortedResults.map(result => (
					<div key={result.name}>
						<p>{result.name} <button onClick={() => setSearchTerm(result.name)}>Show</button></p> 
					</div>
				))}
			</div>
		);
	}

	return (
		<div>
			<p>Too many results to show. <br />Give additional filters!</p>
		</div>		
	);

};

export default Results;
