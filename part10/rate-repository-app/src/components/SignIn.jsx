import React, { useContext } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import TextInput from './TextInput';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

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

const initialValues = {
	username: '',
	password: '',
};

const validationSchema = yup.object().shape({
	username: yup.string().required('Username is required!'),
	password: yup.string().required('Password is required!'),
});

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
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{ ({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} /> }
		</Formik>
	);
};

const SignInForm = ({ onSubmit }) => {
	return (
		<View>
			<Text style={{ fontSize: 24, textAlign: 'center', fontWeight: 'bold', margin: 20 }}>
				Sign in
			</Text>
			<FormikTextInput name="username" placeholder="Username" />
			<FormikTextInput name="password" placeholder="Password" isPassword />
			<Pressable onPress={onSubmit}>
				<Text style={styles.button}>Sign in</Text>
			</Pressable>
		</View>
	);
}

export default SignIn;