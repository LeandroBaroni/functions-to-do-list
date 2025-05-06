import { Router } from 'express';

import usersRouter from './users/routes.js';
import todosRouter from './to-do/routes.js';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/to-do', todosRouter);
// routes.use('/api-docs', swaggerUi.serve);

export default routes;