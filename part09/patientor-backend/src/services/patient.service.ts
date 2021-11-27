import patients from '../../data/patients';
import { Patient, SecuredPatient, NewPatient, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getPatient = (id: string): Patient => {
	const patient = patients.filter(p => p.id === id);
	return patient[0];
}

const getPatients = (): SecuredPatient[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}));
};

const addPatient = (entry: NewPatient): Patient => {

	const newPatientEntry = {
		id: uuid(),
		...entry,
	};
	
	patients.push(newPatientEntry);

	return newPatientEntry;
};

const addEntry = (id: string, entry: Entry): Patient => {
	// Let's get the patient and its index
	const patient = patients.filter(p => p.id === id)[0];
	const index = patients.indexOf(patient);

	// Let's push the new antry into the entries array...
	patients[index].entries.push(entry);

	const modifiedPatient = patients.filter(p => p.id === id)[0];

	// console.log(modifiedPatient);

	return modifiedPatient;
};

export default {
	getPatient,
	getPatients,
	addPatient,
	addEntry,
};