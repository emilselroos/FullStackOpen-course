import React, { useEffect } from 'react';

const Notification = ({ message, setNotification }) => {

	useEffect(() => {
		setTimeout(() => {
			setNotification('');
		}, 10000);
	}, []);

	return (
		<div>
			<p style={{ color: 'red' }}>{message}</p>
		</div>
	);
};

export default Notification;