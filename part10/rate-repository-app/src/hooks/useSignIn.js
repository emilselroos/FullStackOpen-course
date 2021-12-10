import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { AUTHORIZE_USER } from '../graphql/mutations';

const useSignIn = () => {

	const [ mutate, result ] = useMutation(AUTHORIZE_USER, {
		onError: (error) => {
			alert(error);
		}
	});

	const signIn = async ({ username, password }) => {
		return await mutate({ variables: { username: username, password: password } });
	}

  	return [ signIn, result ];
};

export default useSignIn;
