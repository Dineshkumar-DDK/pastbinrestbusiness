import express from 'express';
import { healthz } from './routes/health';
import { createPaste } from './routes/createPaste';
import { fetchPaste } from './routes/fetchPaste';
import { viewPaste } from './routes/viewPaste';


const app = express();
app.use(express.json());

app.get('/healthz', healthz);
app.post('/api/paste', createPaste);
app.get('/api/paste/:id', fetchPaste);
app.get('/p/:id', viewPaste);

export default app;
