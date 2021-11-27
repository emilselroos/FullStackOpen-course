import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import diagnoseRoutes from './routes/diagnose.routes';
import patientRoutes from './routes/patient.routes';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
	console.log('someone pinged here');
	res.send('pong');
});

app.use('/api/diagnosis', diagnoseRoutes);
app.use('/api/patients', patientRoutes);


const PORT = 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
