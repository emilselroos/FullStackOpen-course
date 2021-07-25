import React from 'react';

import StatisticLine from './StatisticLine.js';

const Statistics = ({ answers }) => {

	const average = (answers.good - answers.bad) / answers.total;
	const positive = (answers.good / answers.total) * 100;

	return (
		<div>
			<h1>Statistics</h1>
			<table>
				<tbody>
					<StatisticLine text="Good" value={answers.good} />
					<StatisticLine text="Neutral" value={answers.neutral} />
					<StatisticLine text="Bad" value={answers.bad} />
					<StatisticLine text="Total" value={answers.total} />
					<StatisticLine text="Average" value={average} />
					<StatisticLine text="Positive" value={positive} />
				</tbody>	
			</table>
		</div>		
	);
};

export default Statistics;
