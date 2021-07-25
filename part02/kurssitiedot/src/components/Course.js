import React from 'react';

import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({ course }) => {

	const calcTotal = () => {
		const parts = course.parts;
		const total = parts.reduce((sum, part) => {
			const updated = sum + part.exercises;
			return updated;
		}, 0);
		return total;
	}

	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total total={calcTotal()} />
		</div>
	);
};

export default Course;
