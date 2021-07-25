import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Results from './components/Results';

const App = () => {

  const [ countries, setCountries ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        setCountries(response.data);
      })
  }, []);

  const handleSearchChange = (event) => {
    // console.log('Suoritettu.', event.target.value);
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <h2>Search for countries</h2>
      <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <Results countries={countries} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
}

export default App;
