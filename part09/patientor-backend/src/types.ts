
export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other'
}

export interface Diagnosis {
	code: string,
	name: string,
	latin?: string // optional
}

export interface Patient {
	id: string,
	name: string,
	ssn?: string,
	dateOfBirth: string,
	gender: Gender,
	occupation: string,
	entries: Entry[],
}

export type SecuredPatient = Omit<Patient, 'ssn' | 'entries' >

export interface NewPatient {
	name: string,
	ssn?: string,
	dateOfBirth: string,
	gender: Gender,
	occupation: string,
	entries: Entry[],
}

export type Entry =
	| HospitalEntry
	| OccupationalHealthcareEntry
	| HealthCheckEntry;

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3,
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	stickLeave?: {
		startDate: string,
		endDate: string,
	}
}

interface HospitalEntry extends BaseEntry {
	type: "Hospital";
	discharge: {
		date: string,
		criteria: string,
	}
}

export type EntryTypes = "HealthCheck" | "OccupationalHealthCare" | "Health";