const jwt = require('jsonwebtoken');
const { noExtendRight } = require('sequelize/dist/lib/operators');
// const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const { User, LoginData } = require('../models');
const { SECRET } = require('../util/config');

loginRouter.post('/', async (request, response, next) => {

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

	const loginEntry = await LoginData.create({
		user_id: user.id,
		token: token,
	}).catch(error => {
		next(error);
	});
	
	response
		.status(200)
		.json({
			token,
			username: user.username,
			loginEntry
		});
});

module.exports = loginRouter;