const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const Person = require('./models/person.js');

morgan.token('body', (req) => {
	if (req.method === 'POST' || req.method === 'PUT') {
		return JSON.stringify(req.body);
	}
	return ' ';
});

app.use(express.static('build'));
app.use(express.json());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// GET info (MongoDB)
app.get('/info', (res) => {

	let currentDate = Date(Date.now());

	Person.find({}).then((results) => {
		res.send(`
			<p>Phonebook has info for ${results.length} people.</p>
			<p>${currentDate.toString()}</p>
		`);
	});

});

// GET one person (MongoDB)
app.get('/api/persons/:id', (req, res, next) => {

	Person.findById(req.params.id)
		.then(person => {
			if (person) {
				res.json(person);
			} else {
				res.status(404).end();
			}
		})
		.catch(error => next(error));

});

// GET all persons (MongoDB)
app.get('/api/persons', (res) => {

	Person
		.find({})
		.then(results => {
			res.json(results);
		});

});

// POST person (MongoDB)
app.post('/api/persons', (req, res, next) => {
	const newPerson = req.body;
	// const newId = Math.floor(Math.random() * 10000) + 1;
	// newPerson.id = newId;

	const person = new Person(newPerson);

	person.save()
		.then(savedPerson => savedPerson.toJSON())
		.then(results => {
			// console.log(`Person ${results.name} with number ${results.number} saved!`);
			res.json(results);
		})
		.catch(error => next(error));

	/*
	// If name is missing...
	if (newPerson.name === undefined || newPerson.name.length < 1) {
		res.status(400).json({
			error: 'Name must be given!'
		});
	}
	// If number is missing...
	else if (newPerson.number === undefined || newPerson.number.length < 1) {
		res.status(400).json({
			error: 'Number must be given!'
		});
	}
	// If the name already exists...
	else if (persons.some(person => person.name === newPerson.name)) {
		res.status(400).json({
			error: `This person (${newPerson.name}) already exists!`
		});

	}
	// Otherwise let's create a new person.
	else {
		persons = persons.concat(newPerson);
		res.json(newPerson);
	}
	*/

});

// EDIT person (MongoDB)
app.put('/api/persons/:id', (req, res, next) => {

	// console.log(req.body)

	const person = {
		number: req.body.number,
	};

	Person.findByIdAndUpdate(req.params.id, person, { new: true })
		.then(updatedPerson => {
			console.log(updatedPerson);
			res.json(updatedPerson);
		})
		.catch(error => next(error));

});

// DELETE person (MondgoDB)
app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end();
		})
		.catch(error => next(error));
});


const errorHandler = (error, request, response, next) => {
	console.error(error.message);
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'Malformatted ID!' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}
	next(error);
};

app.use(errorHandler);

// LISTEN HTTP REQUESTS
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
