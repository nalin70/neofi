import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './models/index.js';
import config from './config.js';
import authRoutes from './routes/auth.routes.js';
import eventRoutes from './routes/event.routes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

sequelize.sync().then(() => {
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
});