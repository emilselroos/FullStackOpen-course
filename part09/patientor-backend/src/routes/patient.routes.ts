import express from 'express';
import service from '../services/patient.service';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const entries = service.getEntries();
  // Let's delete the SSN from each entry for security reasons.
  entries.forEach((v) => { delete v.ssn });
  res.send(entries);
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewDiaryEntry(req.body);
    const addedEntry = service.addEntry(newPatientEntry);
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
