
interface AskedValuesBmi {
	height: number;
	weight: number;
}

const parseArgumentsForBmi = (args: Array<string>): AskedValuesBmi => {

	if (process.argv.length < 4) throw new Error('Not enough arguments.');
	if (process.argv.length > 4) throw new Error('Too many arguments.');

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			height: Number(args[2]),
			weight: Number(args[3])
		};
	} else {
		throw new Error('Provided values were not numbers!');
	}

};

const calculateBmi = (height: number, weight: number): string => {

	const bmi = weight / (height / 100 * height / 100);
	let message  = '';

	if (bmi >= 30) {
		message = 'Obese';
	}
	else if (bmi < 30 && bmi >= 25) {
		message = 'Overweight';
	}
	else if (bmi > 18.5 && bmi < 25) {
		message = 'Normal weight';
	}
	else if (bmi <= 18.5) {
		message = 'Underweight';
	}

	return message;

};

try {

	const { height, weight } = parseArgumentsForBmi( process.argv );
	console.log( calculateBmi( height, weight ) );

} catch (error: unknown) {

	let errorMessage = 'Something bad happened.';

	if(error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}

	console.log(errorMessage);

}

export default calculateBmi;