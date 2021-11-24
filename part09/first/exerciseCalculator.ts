/*
interface AskedValuesExercises {
	target: number;
	hours: Array<number>;
}
*/

interface ResultObject {
	periodLength: number,
	trainingDays: number,
	success: boolean,
	rating: number,
	ratingDescription: string,
	target: number,
	average: number,
}
/*
const parseArguments = (args: Array<string>): AskedValuesExercises => {

	if (process.argv.length < 4) throw new Error('Not enough arguments.');
	// if (process.argv.length > 4) throw new Error('Too many arguments.');

	if (!isNaN(Number(args[2]))) {

		var target: number = Number(args[2]);
		var hours: Array<number> = [];
		var argsCount = args.length;

		for (let i = 3; i < argsCount; i++) {
			if (isNaN(Number(args[i]))) {
				throw new Error('Provided hours were not numbers!');
			}
			hours.push(Number(args[i]));
		}

		return {
			target: target,
			hours: hours,
		}
	} else {
		throw new Error('Provided values were not numbers!');
	}

}
*/

const calculateExercises = (target: number, hours: Array<number>): ResultObject => {

	// console.log('Target: ', target);
	// console.log('Hours: ', hours);
	const totalHours = hours.reduce((a,b) => a + b);
	
	const periodLength = hours.length;
	const trainingDays = hours.filter(el => el > 0).length;
	const average = totalHours / periodLength;
	const success =  average > target ? true : false;
	let rating = 0;
	let ratingDescription = '';

	if (average - target >= 0.2) {
		rating = 3;
		ratingDescription = 'You are doing great honey!';
	}
	else if (average - target > -0.2 && average - target < 0.2) {
		rating = 2;
		ratingDescription = 'Not too bad but could be better.';
	}
	else if (average - target <= -0.2) {
		rating = 1;
		ratingDescription = 'Lost case...';
	}

	return {
		periodLength: periodLength,
		trainingDays: trainingDays,
		success: success,
		rating: rating,
		ratingDescription: ratingDescription,
		target: target,
		average: Number(average.toFixed(2)),
	};
};

/*
try {

	const { target, hours } = parseArguments( process.argv );
	console.log( calculateExercises( target, hours ) );

} catch (error: unknown) {

	let errorMessage = 'Something bad happened.'

	if(error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}

	console.log(errorMessage);

}
*/

export default calculateExercises;