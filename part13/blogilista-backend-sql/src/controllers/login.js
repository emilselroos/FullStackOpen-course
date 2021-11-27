const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const { User } = require('../models');
const { SECRET } = require('../util/config');

loginRouter.post('/', async (request, response) => {

	const body = request.body;
	const user = await User.findOne({ where: { username: body.username } });

	if (!user) {
		response.status(404).json({ message: 'Such username does not exist!' });
	}

	const userForToken = {
		id: user.id,
		username: user.username,
	}

	const token = jwt.sign(userForToken, SECRET);

	response
		.status(200)
		.send({
			token,
			username: user.username,
			// name: user.name,
		});
});

module.exports = loginRouter;