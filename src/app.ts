import express from 'express';
import cors from 'cors';
import config from './config';

import vehicleRouter from './routes/vehicle.routes';
import reportsRouter from './routes/reports.routes';

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/vehicle', vehicleRouter);
app.use('/reports', reportsRouter);

app.set('port', config.app.port);

export default app;
