import express from 'express';
import alertsRoutes from './routes/AlertsRoutes';
var cors = require('cors')


const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/alerts', alertsRoutes);

export default app;

