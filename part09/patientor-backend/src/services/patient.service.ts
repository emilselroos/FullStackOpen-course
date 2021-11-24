import patientsEntries from '../../data/patients';
import { PatientEntry, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): Array<PatientEntry> => {
	return patientsEntries;
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {

	const newPatientEntry = {
		id: uuid(),
		...entry,
	};
	
	patientsEntries.push(newPatientEntry);

	return newPatientEntry;
};

export default {
	getEntries,
	addEntry
};