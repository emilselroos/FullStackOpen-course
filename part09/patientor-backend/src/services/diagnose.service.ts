import diagnosesEntries from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getEntries = (): Array<Diagnosis> => {
	return diagnosesEntries;
};

const addEntry = () => {
	return null;
};

export default {
	getEntries,
	addEntry
};