import { gql } from '@apollo/client';

export const AUTHORIZE_USER = gql`
	mutation authorize($username: String!, $password: String!) {
		authorize(credentials: { username: $username, password: $password }) {
			accessToken
		}
  	}
`;

export const CREATE_REVIEW = gql`
mutation create_review ($repositoryOwnerName: String!, $repositoryName: String!, $rating: Int!, $reviewContent: String) {
	createReview (review: { repositoryName: $repositoryName, ownerName: $repositoryOwnerName, rating: $rating, text:$reviewContent }) {
		id
		userId
		repositoryId
		rating
		createdAt
		text
	}
}
`;

export const CREATE_USER = gql`
mutation create_user ($username: String!, $password: String!) {
	createUser (user: { username: $username, password: $password }) {
		username
	}
}
`;