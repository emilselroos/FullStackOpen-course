import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Todo from './Todo';

test('renders single Todo correctly', () => {

	const todo = {
		id: '0t0e0s0t',
		text: 'test task',
		done: false,
	};
	const onClickDelete = jest.fn();
	const onClickComplete = jest.fn();

  	let component = render(<Todo todo={todo} onClickDelete={onClickDelete} onClickComplete={onClickComplete} />);

	const todoText = component.container.querySelector( '.task-title');
	const todoDone = component.container.querySelector('.task-done');

	expect(todoText).toHaveTextContent('test task');
	expect(todoDone).toHaveTextContent('This todo is not done!');

});
