const { SECRET } = require('../util/config');
const jwt = require('jsonwebtoken');

const errorHandler = (error, request, response, next) => {

	console.error('KATO TÄÄ: ', error.name, error.message);

	if (error.name === 'CastError') {
		return response.status(400).json({ error: 'Malformatted ID!' });
	}

	if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}

	if (error.name === 'SequelizeDatabaseError') {
		return response.status(400).json({ error: error.message });
	}

	if (error.name === 'SequelizeValidationError') {
		return response.status(400).json({ error: error.message });
	}

	if (error.name === 'SequelizeForeignKeyConstraintError') {
		return response.status(400).json({ error: error.message });
	}

	if (error.name === 'SequelizeEagerLoadingError') {
		return response.status(400).json({ error: error.message });
	}

	next(error);

};

const tokenExtractor = (request, response, next) => {

	const authorization = request.get('authorization');

	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		request.token = authorization.substring(7);
	} else {
		request.token = null;
	}

	next();

}

const userExtractor = (request, response, next) => {
	if (request.token) {
		const decodedToken = jwt.verify(request.token, SECRET);
		request.user = decodedToken;
	}
	next();
}

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor
}