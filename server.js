import express from 'express';
import 'dotenv/config';
import { healthz } from './src/routes/healthz.js';
import { createPaste } from './src/routes/createPaste.js';
import { fetchPaste } from './src/routes/fetchPaste.js';
import { viewPaste } from './src/routes/viewPaste.js';
import { url } from './src/utils/constants.js';

const app = express();
app.use(express.json());

app.get(url.HEALTHZ, healthz);
app.post(url.PASTES, createPaste);
app.get(url.FETCH_PASTES, fetchPaste);
app.get(url.VIEW_PASTES, viewPaste);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
