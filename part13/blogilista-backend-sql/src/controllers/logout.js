const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const logoutRouter = require('express').Router();
const { User, LoginData } = require('../models');
const { SECRET } = require('../util/config');

logoutRouter.delete('/', async (req, res) => {

	if (!req.token || !req.user.id) {
		return res.status(401).json({ error: 'You are not logged in so you cant logout either.' });
	}

	console.log(req.token);
	console.log(req.user);

	const log = await LoginData.findOne({
		where: {
			user_id: req.user.id,
		}
	});

	if (log.token === req.token) {
		// Kaikki OK, poistetaan kirjautumistieto eli kirjataan käyttäjä ulos.
		LoginData.destroy({where: {user_id: req.user.id}});
		res.json('You logged out correctly.');
	}

	res.json('Wrong token! You should not even be here.');

});

module.exports = logoutRouter;