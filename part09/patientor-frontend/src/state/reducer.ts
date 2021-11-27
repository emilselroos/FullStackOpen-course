import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
  }
  | {
      type: "SET_DIAGNOSIS";
      payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: Entry;
  };

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi,
  };
};

export const setPatient = (patientFromApi: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: patientFromApi,
  };
};

export const setDiagnosis = (diagnosisFromApi: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS",
    payload: diagnosisFromApi,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: {
          ...action.payload
        }
      };
    case "SET_DIAGNOSIS":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
          ...state.diagnosis
        }
      };
    default:
      return state;
  }
};
