import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
	query all_repositories (
		$orderBy: AllRepositoriesOrderBy,
		$orderDirection: OrderDirection,
		$searchKeyword: String
		$first: Int
		$after: String
		) {
		repositories(
			orderBy: $orderBy
			orderDirection: $orderDirection
			searchKeyword: $searchKeyword
			first: $first
			after: $after
		) {
			totalCount
			edges {
				node {
					
					id
					ownerName
					name
					createdAt
					fullName
					ratingAverage
					reviewCount
					stargazersCount
					watchersCount
					forksCount
					url
					ownerAvatarUrl
					description
					language

				}
				cursor
			}
			pageInfo {
				endCursor
				startCursor
				hasNextPage
			}
		}
  	}
`;

export const GET_SINGLE_REPOSITORY = gql`
	query single_repository (
		$repositoryId: ID!
		$first: Int
		$after: String
		) {
		repository(id: $repositoryId) {

			id
			ownerName
			name
			createdAt
			fullName
			ratingAverage
			reviewCount
			stargazersCount
			watchersCount
			forksCount
			url
			ownerAvatarUrl
			description
			language

			reviews (first: $first, after: $after) {
				totalCount
				edges {
					node {
						id
						text
						rating
						createdAt
						user {
							id
							username
						}
					}
					cursor
				}
				pageInfo {
					endCursor
					startCursor
					hasNextPage
				}
			}

		}
	}
`;

export const GET_AUTHORIZED_USER = gql`
	query {
		authorizedUser {
			id
			username
		}
	}
`;