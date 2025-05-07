import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import usersRouter from './users/routes.js';
import todosRouter from './to-do/routes.js';
import swaggerSpec from 'src/core/configs/swaggerConfig.js';

const routes = Router();

routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
routes.use('/users', usersRouter);
routes.use('/to-do', todosRouter);

export default routes;