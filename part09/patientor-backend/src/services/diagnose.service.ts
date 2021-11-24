import diagnosesEntries from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const getEntries = (): Array<DiagnoseEntry> => {
	return diagnosesEntries;
};

const addEntry = () => {
	return null;
};

export default {
	getEntries,
	addEntry
};