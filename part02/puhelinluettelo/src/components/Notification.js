import React from 'react';

const Notification = ({ message }) => {
	
	if (message === null) {
		return null;
	}

	return (
		<div className="message">
			<h3>{message}</h3>
		</div>
	);
};

export default Notification;
