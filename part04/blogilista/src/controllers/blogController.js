const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blogs.js');
const User = require('../models/users.js');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).sort({ likes: -1 }).populate('user');
	response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {

	if (!request.token || !request.user.id) {
	  	return response.status(401).json({ error: 'Token is missing or invalid!' });
	}

	const user = await User.findById(request.user.id);

	const blog = new Blog({
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		likes: request.body.likes,
		user: request.user.id,
	});
	const savedBlog = await blog.save();

	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();
	response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
	const blog = await Blog.findByIdAndUpdate(request.params.id, request.body);
	response.status(200).end();
});

blogsRouter.delete('/:id', async (request, response) => {

	const blogpost = await Blog.findById(request.params.id);

	if (!blogpost) {
		return response.status(404).json({ error: 'There is no such blog post!' });
	}
	
	if (!request.token || !request.user.id) {
	  	return response.status(401).json({ error: 'Token is missing or invalid!' });
	}

	if (request.user.id !== blogpost.user._id.toString()) {
		return response.status(401).json({ error: 'This blog post is not yours!' });
	}

	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

module.exports = blogsRouter;
