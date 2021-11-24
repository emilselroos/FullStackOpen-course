import express from 'express';
import service from '../services/diagnose.service';

const router = express.Router();

router.get('/', (_req, res) => {
  const entries = service.getEntries();
  res.send(entries);
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;