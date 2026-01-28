import express from 'express';


import { url } from './utils/constants.js';
import { healthz } from './routes/healthz.js';
import { createPaste } from './routes/createPaste.js';
import { fetchPaste } from './routes/fetchPaste.js';
import { viewPaste } from './routes/viewPaste.js';

const app = express();
app.use(express.json());

app.get(url.HEALTHZ, healthz);
app.post(url.PASTES, createPaste);
app.get(url.FETCH_PASTES, fetchPaste);
app.get(url.VIEW_PASTES, viewPaste);

export default app;
