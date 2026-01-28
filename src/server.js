import express from 'express';
import { healthz } from './routes/healthz.js';
import { createPaste } from './routes/createPaste.js';
import { fetchPaste } from './routes/fetchPaste.js';
import { viewPaste } from './routes/viewPaste.js';

const app = express();
app.use(express.json());

app.get('/healthz', healthz);
app.post('/api/paste', createPaste);
app.get('/api/paste/:id', fetchPaste);
app.get('/p/:id', viewPaste);

export default app;
