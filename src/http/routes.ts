import { Router } from 'express';

import usersRouter from './users/routes';
import todosRouter from './to-do/routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/to-do', todosRouter);
// routes.use('/api-docs', swaggerUi.serve);

export default routes;