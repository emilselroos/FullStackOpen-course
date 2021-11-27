const { Op } = require('sequelize');
const router = require('express').Router();
const { Blog, User } = require('../models');

router.get('/', async (req, res, next) => {

	Blog.findAll({
		where: {
			[Op.or]: [
				{
					title: req.query.search ? {
						[Op.iLike]: `%${req.query.search}%`
					} : {
						[Op.ne]: ''
					},					
				},
				{
					author: req.query.search ? {
						[Op.iLike]: `%${req.query.search}%`
					} : {
						[Op.ne]: ''
					},					
				},				
			]

		},
		include: { model: User },
		order: [ ['likes', 'DESC'] ]
	}).then(blogs => {
		return res.json(blogs);
	}).catch(error => {
		next(error);
	});
	
});

router.post('/', async (req, res, next) => {

	if (!req.token || !req.user.id) {
		return res.status(401).json({ error: 'Token is missing or invalid!' });
	}

	const blog = await Blog.create({
		author: req.body.author,
		title: req.body.title,
		url: req.body.url,
		year: req.body.year,
		userId: req.user.id,
	}).catch(error => {
		// res.status(400).send('Something went wrong...');
		next(error);		
	});

	res.json(blog);
});

router.put('/:id', async (req, res, next) => {
	const blog = await Blog.findByPk(req.params.id);
	// blog.likes += 1; // This is how it should be done, tho :D
	blog.likes = req.body.likes;

	blog.save().then(blog => {
		res.json(blog);	
	}).catch(error => {
		res.status(400).send('Something went wrong...');
		next(error);
	});
});

router.delete('/:id', async (req, res, next) => {

	if (!req.token || !req.user.id) {
		return res.status(401).json({ error: 'Token is missing or invalid!' });
	}

	const blog = await Blog.findByPk(req.params.id);

	if (req.user.id !== blog.userId) {
		return res.status(401).json({ error: 'You are not allowed to do that!' });
	}

	blog.destroy();
	res.status(404).end();
});

module.exports = router;
