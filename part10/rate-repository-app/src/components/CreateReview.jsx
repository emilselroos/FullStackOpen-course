import React from 'react';
import { useHistory } from 'react-router-dom';
import { Pressable, View, StyleSheet } from 'react-native';
import useSignIn from '../hooks/useSignIn';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { Formik } from 'formik';
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const validationSchema = yup.object().shape({
	repositoryOwnerName: yup.string().required('Repository owner name is required!'),
	repositoryName: yup.string().required('Repository name is required!'),
	rating: yup.number().required('Rating is required!').min(0).max(100),
	reviewContent: yup.string(),
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

const CreateReviewForm = ({ onSubmit }) => {
	return (
		<View>

			<Text style={{ fontSize: 24, textAlign: 'center', fontWeight: 'bold', margin: 20 }}>
				Create a review
			</Text>

			<FormikTextInput name="repositoryOwnerName" placeholder="Repository owner name" />
			<FormikTextInput name="repositoryName" placeholder="Repository name" />
			<FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
			<FormikTextInput name="reviewContent" placeholder="Review" multiline={true} />

			<Pressable onPress={onSubmit}>
				<Text style={styles.button}>Create a review</Text>
			</Pressable>

		</View>
	);
}

export const CreateReviewFormContainer = ({ onSubmit }) => {

	const initialValues = {
		repositoryOwnerName: '',
		repositoryName: '',
		rating: '',
		reviewContent: '',
	};
	
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const CreateReview = () => {

	const history = useHistory();

	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();
	const [ mutateWith ] = useMutation(CREATE_REVIEW);

	const onSubmit = async (values) => {

		const {
			repositoryOwnerName,
			repositoryName,
			rating,
			reviewContent
		} = values;
		
		try {

			const { data } = await mutateWith({
				variables: {
					repositoryOwnerName,
					repositoryName,
					rating: Number(rating),
					reviewContent,
				}
			});

			// We are not handling following error cases:
			// - Same user can review same repository only once.
			// - Only existing repositories can be reviewed.

			if (data === undefined) {
				// console.log(data);
				return alert('Something went wrong!');
			}

			// console.log(data)
			history.push(`/repository/${data.createReview.repositoryId}`);

		} catch (e) {
			console.log(e);
			return alert('Something went wrong!');
		}
	}

	return (
		<CreateReviewFormContainer onSubmit={onSubmit} />
	);
};

export default CreateReview;
