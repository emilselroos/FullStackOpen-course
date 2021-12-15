import React from 'react';
import { useHistory } from 'react-router-dom';
import useSignIn from '../hooks/useSignIn';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Text from './Text';

import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const validationSchema = yup.object().shape({
	username: yup.string()
		.required('Username is required!')
		.min(1, 'Username must be at least 1 characters long!')
		.max(30, "Username can't be more than 30 characters long!"),
	password: yup.string()
		.required('Password is required!')
		.min(5, 'Password must be at least 5 characters long!')
		.max(50, "Password can't be more than 50 characters long!"),
	passwordConfirmation: yup.string()
		.oneOf([yup.ref('password'), null])
		.required('Password confirmation is required!'),
});

const styles = StyleSheet.create({
	button: {
		padding: 12,
		margin: 10,
		backgroundColor: '#1167b1',
		borderRadius: 10,
		color: '#FFFFFF',
		alignSelf: 'stretch',
		textAlign: 'center',
		fontSize: 20
	}
});

const SignUpForm = ({ onSubmit }) => {
	return (
		<View>
			<Text style={{ fontSize: 24, textAlign: 'center', fontWeight: 'bold', margin: 20 }}>
				Sign up
			</Text>
			<FormikTextInput name="username" placeholder="Username" />
			<FormikTextInput name="password" placeholder="Password" isPassword />
			<FormikTextInput name="passwordConfirmation" placeholder="Repeat password" isPassword />
			<Pressable onPress={onSubmit} testID="submitButton">
				<Text style={styles.button}>Sign up</Text>
			</Pressable>
		</View>
	);
}

export const SignUpFormContainer = ({ onSubmit }) => {

	const initialValues = {
		username: '',
		password: '',
		passwordConfirmation: '',
	};
	
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const SignUp = () => {

	const history = useHistory();
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();
	const [ mutateWith ] = useMutation(CREATE_USER);
	const [ signIn ] = useSignIn();

	const onSubmit = async (values) => {

		const { username, password } = values;
		console.log(values);

		try {
			const singup = await mutateWith({
				variables: {
					username: username,
					password: password,	
				}
			});

			if (singup.data === undefined) {
				console.log(singup.data)
				return alert('Something went wrong! (1)');
			}

			// User should be signed up, let's sign it in.
			const { data } = await signIn({ username: username, password: password });
			await authStorage.setAccessToken(data?.authorize.accessToken)
			apolloClient.resetStore();
			history.push(`/`);

		} catch (e) {
			console.log(e);
			return alert('Something went wrong! (2)');
		}
	}

	return (
		<SignUpFormContainer onSubmit={onSubmit} />
	);
};

export default SignUp;
