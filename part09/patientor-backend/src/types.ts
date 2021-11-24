
export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other'
}

export interface DiagnoseEntry {
	code: string,
	name: string,
	latin?: string // optional
}

export interface PatientEntry {
	id: string,
	name: string,
	ssn?: string,
	dateOfBirth: string,
	gender: Gender,
	occupation: string,
}

export interface NewPatientEntry {
	name: string,
	ssn?: string,
	dateOfBirth: string,
	gender: Gender,
	occupation: string,
}
