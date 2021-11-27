import express from 'express';
import service from '../services/patient.service';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = service.getPatients();
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const patient = service.getPatient(req.params.id);
  res.send(patient);
});

router.post('/:id/entries', (req, res) => {

  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = service.addEntry(req.params.id, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }


});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = service.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
