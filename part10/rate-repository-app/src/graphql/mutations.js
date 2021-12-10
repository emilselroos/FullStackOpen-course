import { gql } from '@apollo/client';

export const AUTHORIZE_USER = gql`
	mutation authorize($username: String!, $password: String!) {
		authorize(credentials: { username: $username, password: $password }) {
			accessToken
		}
  	}
`;
