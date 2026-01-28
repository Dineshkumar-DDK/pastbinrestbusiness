import express from 'express';


import { url } from './utils/constants';
import { healthz } from './routes/health';
import { createPaste } from './routes/createPaste';
import { fetchPaste } from './routes/fetchPaste';
import { viewPaste } from './routes/viewPaste';

const app = express();
app.use(express.json());

app.get(url.HEALTHZ, healthz);
app.post(url.PASTES, createPaste);
app.get(url.FETCH_PASTES, fetchPaste);
app.get(url.VIEW_PASTES, viewPaste);

export default app;
