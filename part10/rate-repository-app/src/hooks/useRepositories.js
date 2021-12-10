import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  	// const [ repositories, setRepositories ] = useState();
  	// const [ loading, setLoading ] = useState(false);

	const { data, error, loading } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
	});

	const repositories = data?.repositories;

	/*
	const fetchRepositories = async () => {
		setLoading(true);

		// Replace the IP address part with your own IP address!
		// const response = await fetch('http://192.168.1.146:5000/api/repositories');
		// const json = await response.json();


		setLoading(loading);
		setRepositories(data);
	};
	

	useEffect(() => {
		fetchRepositories();
	}, []);
	*/
	

  	return { repositories, loading, /* refetch: fetchRepositories*/ };
};

export default useRepositories;
