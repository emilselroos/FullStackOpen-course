const router = require('express').Router();
const { User, Blog, Readinglist } = require('../models');

router.get('/', async (req, res, next) => {
	const users = await User.findAll({
		include: [
			{
				model: Blog,
			},
		]
		
	});
	res.json(users);
});

router.get('/:id', async (req, res, next) => {
	User.findOne({
		where: {
			id: req.params.id,
		},
		include: [{
			model: Blog,
			as: 'readings',
			attributes: [ 'id', 'title', 'url', 'author', 'likes', 'year' ],
			through: {
				attributes: [ 'is_read', 'id' ],
				where: req.query.read ? {
					is_read: req.query.read
				} : {}
			},
		}],	
		
	}).then(user => {
		res.json(user);
	}).catch(error => next(error));
	
});

router.post('/', async (req, res, next) => {
	const user = await User.create({
		username: req.body.username,
		name: req.body.name,
	}).catch(error => {
		res.status(400).send(error.errors[0].message);
		next(error);
	});

	res.json(user);
});

router.put('/:username', async (req, res, next) => {
	const user = await User.findOne({ where: { username: req.params.username } });
	user.name = req.body.name;

	user.save().then(newUserObj => {
		res.json(newUserObj);	
	}).catch(error => {
		res.status(400).send(error.errors[0].message);
		next(error);
	});
});

module.exports = router;
