const bcryptjs = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/users.js');

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs');
	response.json(users);
});

usersRouter.post('/', async (request, response) => {
	const saltRounds = 10;
	const passwordHash = await bcryptjs.hash(request.body.password, saltRounds);
  
	if (!request.body.password || request.body.password.length < 3) {
		response.status(400).send({ error: 'Password has to be at least 3 characters long!' });
	}

	const user = new User({
		username: request.body.username,
		name: request.body.name,
		password: passwordHash
	});

	const savedUser = await user.save();
	
	response.status(201).json(savedUser);
});

/*
usersRouter.put('/:id', async (request, response) => {
	const blog = await Blog.findByIdAndUpdate(request.params.id, request.body);
	response.status(200).end();
});

usersRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});
*/

module.exports = usersRouter;
