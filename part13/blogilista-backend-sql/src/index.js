const bodyParser = require('body-parser');
const middleware = require('./util/middleware');
const express = require('express');
// require('express-async-errors');
const app = express();

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');

const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const authorRouter = require('./controllers/authors');

app.use(bodyParser.json());
app.use(middleware.tokenExtractor);
app.use(middleware.userExtractor);

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorRouter);

app.use(middleware.errorHandler);

const start = async () => {
	await connectToDatabase();
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

start();
