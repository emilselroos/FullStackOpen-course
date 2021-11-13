import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewBlogForm from './NewBlogForm';

describe('<NewBlogForm />', () => {

	test('creates a new form', () => {
		
		const handleSubmit = jest.fn();
		const component = render(
			<NewBlogForm createNewBlog={handleSubmit} />
		);
		
		const title = component.container.querySelector('#title');
		const author = component.container.querySelector('#author');
		const url = component.container.querySelector('#url');
		const form = component.container.querySelector('form');

		fireEvent.change(title, {
			target: { value: "otsikko" }
		});
		fireEvent.change(author, {
			target: { value: 'me' }
		});
		fireEvent.change(url, {
			target: { value: 'https://' }
		});		

		fireEvent.submit(form);

		// Varmistetaan, että tapahtumakäsittelijää on kutsuttu...
		expect(handleSubmit.mock.calls).toHaveLength(1);
		// Varmistetaan, että syötteet ovat oikein...
		expect(handleSubmit.mock.calls[0][0].title).toBe("otsikko");
		expect(handleSubmit.mock.calls[0][0].author).toBe('me');
		expect(handleSubmit.mock.calls[0][0].url).toBe('https://');
	});

});
