import cors from 'cors';
import express, { type Express } from 'express';
import { createHealthRouter } from './routes/health.js';
import { createTrendingRouter } from './routes/trending.js';

export const createServer = (): Express => {
  const app = express();
  app.use(cors());
  app.use(createHealthRouter());
  app.use('/api/repos', createTrendingRouter());

  app.use((_req, res) => {
    res.status(404).json({ error: 'not_found' });
  });

  return app;
};
