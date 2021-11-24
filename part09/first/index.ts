import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());

import bmiCalculator from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

app.get('/hello', (_req, res) => {
	res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	if(isNaN(Number(height)) || isNaN(Number(weight))) {
		res.send({
			error: 'Malformatted parameters!'
		});
	}

	const bmi = bmiCalculator(height, weight);

	res.send({
		height: height,
		weight: weight,
		bmi: bmi,
	});
});

app.post('/exercises', (req, res) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { target, daily_exercises } = req.body;

	if (isNaN(Number(target))) {
		res.status(400).send({
			error: 'Target was not number!',
		});
	}

	for (let i = 0; i < daily_exercises.length; i++) {
		if (isNaN(Number(daily_exercises[i]))) {
			res.status(400).send({
				error: 'Provided hours were not numbers!',
			});
		}
	}
	
	/*
	if(isNaN(Number(target))) {
		res.send({
			error: 'Malformatted parameters!'
		});
	}
	*/
	
	const result = calculateExercises(target, daily_exercises);
	res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
