import React from 'react';
import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
	describe('RepositoryListContainer', () => {
	  it('renders repository information correctly', () => {
		const repositories = {
		  totalCount: 8,
		  pageInfo: {
			hasNextPage: true,
			endCursor:
			  'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
			startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
		  },
		  edges: [
			{
			  node: {
				id: 'jaredpalmer.formik',
				fullName: 'jaredpalmer/formik',
				description: 'Build forms in React, without the tears',
				language: 'TypeScript',
				forksCount: 1619,
				stargazersCount: 21856,
				ratingAverage: 88,
				reviewCount: 3,
				ownerAvatarUrl:
				  'https://avatars2.githubusercontent.com/u/4060187?v=4',
			  },
			  cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
			},
			{
			  node: {
				id: 'async-library.react-async',
				fullName: 'async-library/react-async',
				description: 'Flexible promise-based React data loader',
				language: 'JavaScript',
				forksCount: 69,
				stargazersCount: 1760,
				ratingAverage: 72,
				reviewCount: 3,
				ownerAvatarUrl:
				  'https://avatars1.githubusercontent.com/u/54310907?v=4',
			  },
			  cursor:
				'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
			},
		  ],
		};
  
		const { debug, getByTestId, getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />)
		
		const names = getAllByTestId('name');
		const description = getAllByTestId('description');
		const language = getAllByTestId('language');
		const forks = getAllByTestId('forks');
		const stars = getAllByTestId('stars');
		const ratings = getAllByTestId('ratings');
		const reviews = getAllByTestId('reviews');
		
		expect(names[0]).toHaveTextContent('jaredpalmer/formik');
		expect(description[0]).toHaveTextContent('Build forms in React, without the tears');
		expect(language[0]).toHaveTextContent('TypeScript');
		expect(forks[0]).toHaveTextContent('1.6k');
		expect(stars[0]).toHaveTextContent('21.9k');
		expect(ratings[0]).toHaveTextContent(88);
		expect(reviews[0]).toHaveTextContent(3);

		expect(names[1]).toHaveTextContent('async-library/react-async');
		expect(description[1]).toHaveTextContent('Flexible promise-based React data loader');
		expect(language[1]).toHaveTextContent('JavaScript');
		expect(forks[1]).toHaveTextContent(69);
		expect(stars[1]).toHaveTextContent('1.8k');
		expect(ratings[1]).toHaveTextContent(72);
		expect(reviews[1]).toHaveTextContent(3);

	  });
	});
  });