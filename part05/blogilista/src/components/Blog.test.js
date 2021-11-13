import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
	let component;

	const blog = {
		title: 'Titteli',
		author: 'Emil Selroos',
		url: 'https://linkki.com/',
		likes: 0,
		user: {
			username: 'test_user',
			name: 'Test User',
			blogs: []
		},
	};

	const mockHandler = jest.fn();

	beforeEach(() => {
		component = render(
			<Blog
				blog={blog}
				own={true}
				handleLike={mockHandler}
			/>
		);
	});

	test('renders title', () => {
		const title = component.getByText('Titteli');
		expect(title).toHaveTextContent('Titteli');
	});

	test('renders author', () => {
		const author = component.container.querySelector('.post_author');
		expect(author).toHaveTextContent('AUTHOR: Emil Selroos');
	});

	test('renders url', () => {
		const button = component.getByText('show');
		fireEvent.click(button);

		const url = component.container.querySelector('.post_url');
		expect(url).toHaveTextContent('URL: https://linkki.com/');
	});

	test('renders likes', () => {
		const button = component.getByText('show');
		fireEvent.click(button);

		const url = component.container.querySelector('.post_likes');
		expect(url).toHaveTextContent('LIKES: ');
	});

	test('double click of like button functions correctly', () => {
		const buttonShow = component.getByText('show');
		fireEvent.click(buttonShow);
		const buttonLike = component.getByText('like');
		fireEvent.click(buttonLike);
		fireEvent.click(buttonLike);
		expect(mockHandler.mock.calls).toHaveLength(2);
	});

});