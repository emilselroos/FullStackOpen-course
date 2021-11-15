import React from 'react';

const LoginForm = ({ user, handleLogin, username, password, setUsername, setPassword }) => (
	<form onSubmit={handleLogin}>
		<h1>Login to Blogs</h1>
		Username: <input id="username" type="text" name="username" value={username} onChange={({ target }) => setUsername(target.value)} />
		<br /><br />
		Password: <input id="password" type="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)} />
		<br /><br />
		<button id="login-button" type="submit">Login</button>
	</form>
);

export default LoginForm;
