import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import blogService from '../services/blogs';

const Blog = ({ blog, own, handleLike, handleRemove }) => {
	const [show, setShow] = useState(0);

	return (
		<div style={{ border: '2px solid #000', padding: '6px 8px', marginTop: '10px' }} className="blogpost">
			<b>{blog.title} {show ? <button onClick={() => setShow(0)}>hide</button> : <button className=".button-show" onClick={() => setShow(1)}>show</button>}</b>
			<p className="post_author">AUTHOR: {blog.author}</p>
			{show ?
				<>
					<p className="post_url">URL: {blog.url}</p>
					<p className="post_likes">LIKES: {blog.likes} <button onClick={() => handleLike(blog)}>like</button></p>
					<br />
					{own ? <button onClick={() => handleRemove(blog.id)}>Remove</button> : null}
				</>
				: null}

		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	own: PropTypes.bool,
};

export default Blog;
