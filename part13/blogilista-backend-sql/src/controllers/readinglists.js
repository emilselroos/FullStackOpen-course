const { Op } = require('sequelize');
const router = require('express').Router();
const { Blog, User, Readinglist, LoginData } = require('../models');

router.post('/', async (req, res, next) => {

	Readinglist.create({
		blog_id: req.body.blog_id,
		user_id: req.body.user_id,
	}).then(entry => {
		res.json(entry);
	}).catch(error => next(error));

});

router.put('/:id', async (req, res, next) => {

	if (!req.token || !req.user.id) {
		return res.status(401).json({ error: 'Token is missing or invalid!' });
	}

	const existingSession = await LoginData.findOne({
		where: {
			token: req.token,
			user_id: req.user.id,
		}
	})

	if (!existingSession) {
		return res.status(401).json({ error: 'You tokeon has expired! Login again.' });
	}

	const entry = await Readinglist.findByPk(req.params.id);
	
	if (req.user.id !== entry.user_id) {
		return res.status(401).json({ error: 'You are not allowed to do that!' });
	}

	entry.is_read = req.body.is_read;
	entry.save();
	res.status(200).end();
});

module.exports = router;
