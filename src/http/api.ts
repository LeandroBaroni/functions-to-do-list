import routes from './routes';
import express from 'express';
import { internalErrors } from '@middlewares/internalErrors.js';
import { globalErrors } from '@middlewares/globalErrors.js';

const app = express();

app.disable('x-powered-by');

app.use(express.json());

app.use(routes);

app.use(internalErrors);

app.use(globalErrors);

export default app;