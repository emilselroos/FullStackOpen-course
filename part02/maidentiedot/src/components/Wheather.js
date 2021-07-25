import React, { useState, useEffect } from 'react';
import axios from 'axios';

const REACT_APP_WHEATHER_API_KEY = process.env.REACT_APP_WHEATHER_API_KEY;

const Wheather = ({ city }) => {

  const [ wheather, setWheather ] = useState({});

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${REACT_APP_WHEATHER_API_KEY}&query=${city}`)
	  .then(response => {
		  console.log(response, REACT_APP_WHEATHER_API_KEY)
        setWheather(response.data);
      })
  }, [city]);


  return (
    <div>
		<h3>Wheather in {city}</h3>
		<p><b>Temperature: </b>{wheather.current.temperature} C</p>
    <p><b>Wind: </b>{wheather.current.wind_speed} m/s</p>
    </div>
  );
}

export default Wheather;
