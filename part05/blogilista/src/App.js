import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [blogs, setBlogs] = useState([]);
	const [notification, setNotification] = useState('');
	const [showCreateForm, setShowCreateForm] = useState(0);

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs(blogs)
		);
	}, []);

	useEffect(() => {
		const user = JSON.parse(window.localStorage.getItem('user'));
		if (user) {
			setUser(user);
		}
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();

		await loginService
			.login(username, password)
			.then((user) => {
				window.localStorage.setItem('user', JSON.stringify(user));
				blogService.setToken(user.token);
				setUser(user);
				setUsername('');
				setPassword('');
			})
			.catch((error) => {
				setNotification(`${error.response.data.error}`);
				setTimeout(() => {
					setNotification(null);
				}, 3000);
			});

	};

	const handleLogout = (event) => {
		window.localStorage.clear();
		setUser(null);
	};

	const handleLike = (blog) => {
		const user = JSON.parse(window.localStorage.getItem('user'));
		blogService.setToken(user.token);

		const newBlog = {
			likes: blog.likes + 1,
			author: blog.author,
			title: blog.title,
			url: blog.url,
		};

		blogService.edit({ id: blog.id, newBlog })
			.then((newObj) => {

				blogService.getAll().then((blogs) => {
					setBlogs(blogs);
				});
			}).catch((error) => {
				console.error(error);
			});
	};

	const handleRemove = (id) => {
		const user = JSON.parse(window.localStorage.getItem('user'));
		blogService.setToken(user.token);
		if (window.confirm('Are you sure?')) {
			setBlogs(blogs.filter((el) => el.id !== id));
			blogService.remove(id);
		}
	};

	const createNewBlog = (blogObject) => {
		const user = JSON.parse(window.localStorage.getItem('user'));
		blogService.setToken(user.token);
		blogService.create(blogObject).then((newPost) => {
			setBlogs(blogs.concat(newPost));
			setNotification(`You have created '${newPost.title}'`);
			setShowCreateForm(0);
			setTimeout(() => {
				setNotification(null);
			}, 3000);
		}).catch((error) => {
			setNotification(`${error.response.data.error}`);
			setTimeout(() => {
				setNotification(null);
			}, 3000);
		});
	};

	return (
		<div>
			<h1>Blogs</h1>

			{notification && (
				<div style={{ border: '2px solid #000', padding: '6px 8px' }}>{notification}</div>
			)}
			<br />

			{!user && (
				<LoginForm
					user={user}
					handleLogin={handleLogin}
					username={username}
					password={password}
					setUsername={setUsername}
					setPassword={setPassword}
				/>
			)}

			{user && (
				<>
					<p>{user.name} logged in. <button onClick={handleLogout}>LOGOUT</button></p>

					{blogs
						.sort((first, second) => ( second.likes - first.likes ))
						.map((blog) => (
							<Blog
								key={blog.id}
								blog={blog}
								own={ user.username === blog.user.username ? true : false }
								handleLike={handleLike}
								handleRemove={handleRemove}
							/>))
					}

					{showCreateForm ?
						<NewBlogForm
							blogs={blogs}
							setBlogs={setBlogs}
							setNotification={setNotification}
							setShowCreateForm={setShowCreateForm}
							createNewBlog={createNewBlog}
						/>
						: null}

					{showCreateForm === 0 && (
						<button id="create-new-blog" onClick={() => setShowCreateForm(1)} style={{ marginTop: '10px' }}>Create a new blog post</button>
					)}

				</>
			)}

		</div>
	);
};

export default App;
