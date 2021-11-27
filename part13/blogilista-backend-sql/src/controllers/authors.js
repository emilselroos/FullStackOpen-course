const router = require('express').Router();
const { Blog, User } = require('../models');
const { sequelize } = require('../models/User');

router.get('/', async (req, res, next) => {

	Blog.findAll({

		attributes: [
			'author', 
			[sequelize.fn('sum', sequelize.col('blog.likes')), 'total_likes'],
			[sequelize.fn('count', sequelize.col('blog.author')), 'blogs_count'],
		],

		// attributes: [ [sequelize.fn('count', sequelize.col('blog.id'), 'author')] ]

		//attributes: [ 'id', 'author', 'likes' ],
		// include: [sequelize.fn('count', sequelize.col('likes'), 't_likes')]

		group: ['blog.author']

		/*
		group: [
			sequelize.fn('count', sequelize.col('likes')),
		],
		*/

		/*
		attributes: [
			[sequelize.fn('COUNT', sequelize.col('likes')), 'likes']
		]
		*/
		// group: 'author',
		// order: [ ['likes', 'DESC'] ]
	}).then(blogs => {
		return res.json(blogs);
	}).catch(error => {
		next(error);
	});
	
});

module.exports = router;
