run command
-npm start

to make the code run as a seperate service

- remove api folder along with the index.js file
- move server.js file to the root directory
- paste the following code (same code but listen to the desired port )
// code starts 
  import express from 'express';
  import 'dotenv/config';
  import { healthz } from './src/routes/health.js';
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


// code ends

-replace the constants.js code with the following 

export const url = {
    HEALTHZ:'/api/healthz',
    PASTES:'/api/pastes',
    FETCH_PASTES:'/api/pastes/:id',
    VIEW_PASTES:'/p/:id'
}
