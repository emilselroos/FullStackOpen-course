import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInFormContainer } from '../../components/SignIn';

describe('SignIn', () => {
	describe('SignInContainer', () => {

		it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
			// render the SignInContainer component, fill the text inputs and press the submit button
			
			const onSubmit = jest.fn();
			const { getByTestId } = render(<SignInFormContainer onSubmit={onSubmit} />);
		
			const usernameField = getByTestId('usernameField');
			const passwordField = getByTestId('passwordField');

			fireEvent.changeText(usernameField, 'kalle');
			fireEvent.changeText(passwordField, 'password');
			fireEvent.press(getByTestId('submitButton'));

			await waitFor(() => {
				
				expect(onSubmit).toHaveBeenCalledTimes(1);
				expect(onSubmit.mock.calls[0][0]).toEqual({
					username: 'kalle',
					password: 'password',
				});
			});

		});

	});
});
