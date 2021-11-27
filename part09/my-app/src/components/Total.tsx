import React from 'react';

interface TotalProps {
	totalCount: number,
}

const Total = (props: TotalProps) => {
	return <p>Number of exercises {" "} {props.totalCount}</p>
}

export default Total;
