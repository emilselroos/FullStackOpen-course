import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ user, handleLogout }) => {
	return (
		<div style={{ padding: '6px 8px', marginTop: '10px', backgroundColor: 'lightgrey' }} className="blogpost">
			<div style={{ display: 'inline-block', width: '80px' }}>
				<Link to="/">BLOGS</Link>
			</div>
			<div style={{ display: 'inline-block', width: '80px' }}>
				<Link to="/create">CREATE</Link>
			</div>
			<div style={{ display: 'inline-block', width: '80px' }}>
				<Link to="/users">USERS</Link>
			</div>
			<div style={{ display: 'inline-block' }}>
				<p><strong>{user.username}</strong> logged in. <button onClick={handleLogout}>LOGOUT</button></p>
			</div>
		</div>
	);
};

export default Navigation;
