const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');

const logger = require('./utils/logger.js');
const middleware  = require('./utils/middleware.js');
const config = require('./utils/config.js');

const blogsRouter = require('./controllers/blogController.js');
const usersRouter = require('./controllers/userController.js');
const loginRouter = require('./controllers/login.js');

logger.info('Connecting to MongoDB');

mongoose.connect(config.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}).then(() => {
	logger.info('Connected to MongoDB');
}).catch((error) => {
	logger.error('Error connecting to MongoDB: ', error);
});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
	console.log('RUNNING IN TESTING ENVIRONMENT');
	const testing = require('./controllers/testing');
	app.use('/api/testing', testing);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
