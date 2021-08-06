const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const MONGODB_URI = process.env.MONGODB_URI;

console.log('Connecting to MongoDB');
mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
}).then(() => {
	console.log('Connected to MongoDB');
}).catch(error => {
	console.log('Error when connceting to MongoDB: ', error);
});

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 3,
		required: true,
		unique: true,
	},
	number: {
		type: String,
		minlength: 8,
	}
});

personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;

/*
if (process.argv.length === 3) {
	console.log('PHONEBOOK:')
	Person.find({}).then(results => {
		results.forEach(person => {
		  console.log(person.name, person.number);
		});
		mongoose.connection.close();
	});
}

if (process.argv.length > 3) {

	const name = process.argv[3];
	const number = process.argv[4];

	const person = new Person({
		name: name,
		number: number
	  });

	person.save().then(results => {
		console.log(`Person ${results.name} with number ${results.number} saved!`);
		mongoose.connection.close();
	})
}
*/