import { NewPatientEntry, Gender } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
	dateOfBirth: parseDateOfBirth(object.dateOfBirth),
	ssn: parseSsn(object.ssn),
	gender: parseGender(object.gender),
	occupation: parseOccupation(object.occupation),
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

export default toNewPatientEntry;