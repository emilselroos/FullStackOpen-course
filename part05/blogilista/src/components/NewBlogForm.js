import React, { useState } from 'react';

const NewBlogForm = ({ createNewBlog, setShowCreateForm }) => {

	const [ title, setTitle ] = useState('');
	const [ author, setAuthor ] = useState('');
	const [ url, setUrl ] = useState('');

	const addNewBlog = (event) => {
		event.preventDefault();

		createNewBlog({
			title: title,
			author: author,
			url: url,
		});
	
		setTitle('');
		setAuthor('');
		setUrl('');
	}

	const handleTitleChange = (event) => {
		setTitle(event.target.value)
	}

	const handleAuthorChange = (event) => {
		setAuthor(event.target.value)
	}

	const handleUrlChange = (event) => {
		setUrl(event.target.value)
	}

	return (
		<form id="form" onSubmit={addNewBlog}>
			<h2>Create new post</h2>
				Title: <input id="title" type="text" name="input-title" value={title} onChange={handleTitleChange} /><br />
				Author: <input id="author" type="text" name="input-author" value={author} onChange={handleAuthorChange} /><br />
				URL: <input id="url" type="text" name="input-url" value={url} onChange={handleUrlChange} /><br />
			<button type="submit">Create</button>
			<button onClick={() => setShowCreateForm(0)}>Hide</button>
		</form>
	);
};

export default NewBlogForm;
