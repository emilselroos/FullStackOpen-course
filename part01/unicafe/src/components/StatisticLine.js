import React from 'react';

const StatisticLine = ({ text, value }) => (
	<tr>
		<td>{text}</td>
		<td>{value}</td>
		{text === 'Positive' && (
			<>
				%
			</>
		)}
	</tr>
);

export default StatisticLine;
