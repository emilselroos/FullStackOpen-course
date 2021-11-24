import React, { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client';

const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password)  {
			value
		}
	}	
`;

const Login = ({ show, setToken }) => {

	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const [ login, result ] = useMutation(LOGIN, {
		onError: (error) => {
			alert(error.graphQLErrors[0].message);
		}
	});

	useEffect(() => {
		if ( result.data ) {
			const token = result.data.login.value;
			setToken(token);
			localStorage.setItem('user-token', token);
			// console.log(localStorage.getItem('user-token'))
		}
	}, [result.data]);

	const submit = async (event) => {
		event.preventDefault()
	
		login({ variables: { username, password } })
	}	

	if (!show) {
		return null;
	}

	return (
		<div>
			<form onSubmit={submit}>
				<div>
				username <input
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
				</div>
				<div>
				password <input
					type='password'
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	)
}

export default Login