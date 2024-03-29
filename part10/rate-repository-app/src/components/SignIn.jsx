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

const validationSchema = yup.object().shape({
	username: yup.string().required('Username is required!'),
	password: yup.string().required('Password is required!'),
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

const SignInForm = ({ onSubmit }) => {
	return (
		<View>
			<Text style={{ fontSize: 24, textAlign: 'center', fontWeight: 'bold', margin: 20 }}>
				Sign in
			</Text>
			<FormikTextInput name="username" placeholder="Username" testID="usernameField" />
			<FormikTextInput name="password" placeholder="Password" isPassword testID="passwordField" />
			<Pressable onPress={onSubmit} testID="submitButton">
				<Text style={styles.button}>Sign in</Text>
			</Pressable>
		</View>
	);
}

export const SignInFormContainer = ({ onSubmit }) => {

	const initialValues = {
		username: '',
		password: '',
	};
	
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const SignIn = () => {
	const history = useHistory();
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();
	const [ signIn ] = useSignIn();

	const onSubmit = async (values) => {
		const { username, password } = values;
		console.log(values);
		try {
			const { data } = await signIn({ username: username, password: password });

			if (data === undefined) {
				// console.log('data === undefined')
				return alert('Wrong credentials!');
			}

			await authStorage.setAccessToken(data?.authorize.accessToken)
			apolloClient.resetStore();
			// console.log(await authStorage.getAccessToken())
			history.push("/");
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<SignInFormContainer onSubmit={onSubmit} />
	);
};

export default SignIn;
