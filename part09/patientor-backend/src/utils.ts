import { v1 as uuid } from 'uuid';
import { NewPatient, Gender, Entry, HealthCheckRating, Diagnosis } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(object.name),
	dateOfBirth: parseDateOfBirth(object.dateOfBirth),
	ssn: parseSsn(object.ssn),
	gender: parseGender(object.gender),
	occupation: parseOccupation(object.occupation),
	entries: parseEntries(object.entries),
  }

  return newEntry;
}

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
	return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error('Incorrect or missing GENDER: ' + gender);
	}
	return gender;
};

const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect or missing NAME!');
	}
	return name;
}

const parseSsn = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error('Incorrect or missing SSN!');
	}
	return ssn;
}

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error('Incorrect or missing OCCUPATION!');
	}
	return occupation;
}

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};
  
const parseDateOfBirth = (dateOfBirth: unknown): string => {
	if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
		throw new Error('Incorrect or missing DATE: ' + dateOfBirth);
	}
	return dateOfBirth;
};

const parseEntries = (entries: Entry[]): Entry[] => {
	if (!entries) {
		throw new Error('Incorrect or missing ENTRIES: ' + entries);
	}

	entries.forEach(ent => {
		if (ent.type !== "HealthCheck" && ent.type !== "OccupationalHealthcare" && ent.type !== "Hospital") {
			throw new Error('Incorrect entry in ENTRIES: ' + entries);
		};
	});

	return entries;
}



const parseString = (string: unknown): string => {
	if (!string || !isString(string)) {
		throw new Error('Incorrect or missing DESCRIPTION!');
	}
	return string;
}

const parseDiagnosisCodes = (diagnosisCodes: Array<Diagnosis['code']>): Array<Diagnosis['code']> => {
	if (diagnosisCodes === undefined) {
		throw new Error('Incorrect DIAGNOSIS CODES!');
	}
	return diagnosisCodes;
}

const parseHealthCheckRating = (healthCheckRating: HealthCheckRating): HealthCheckRating => {
	if (!healthCheckRating) {
		throw new Error('Incorrect or missing HEALTH CHECK RATING!');
	}
	return healthCheckRating;
}

const parseDischarge = (obj: { date: string, criteria: string}): { date: string, criteria: string} => {
	if (!obj) {
		throw new Error('Incorrect or missing HEALTH CHECK RATING!');
	}
	return obj;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (object: any): Entry => {

	var newEntry: Entry;

	if (object.type === "HealthCheck") {
		newEntry = {
			id: uuid(),
			type: object.type,
			description: parseString(object.description),
			date: parseDateOfBirth(object.date),
			specialist: parseString(object.description),
			diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),

			healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
		}				
	}
	else if (object.type === "OccupationalHealthCare") {
		newEntry = {
			id: uuid(),
			type: object.type,
			description: parseString(object.description),
			date: parseDateOfBirth(object.date),
			specialist: parseString(object.description),
			diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
		
			employerName: parseString(object.description),
			stickLeave: object.stickLeave, // optional
		}
	}
	else if (object.type === "Hospital") {
		newEntry = {
			id: uuid(),
			type: object.type,
			description: parseString(object.description),
			date: parseDateOfBirth(object.date),
			specialist: parseString(object.description),
			diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),

			discharge: parseDischarge(object.discharge),
		}
	}
	else {
		throw new Error('Given TYPE doesnt match any possible types.');
	}

	return newEntry;

  }

export {
	toNewPatientEntry,
	toNewEntry,
};