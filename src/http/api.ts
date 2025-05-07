import { HttpsOptions, onRequest } from 'firebase-functions/v2/https';

import routes from './routes';
import { createServer } from 'src/core/utils/createServer';

const server = createServer(routes);

const options: HttpsOptions = {
  cors: true,
  maxInstances: 5
};

// function createServer(routes: express.Router): express.Express {
//   const app = express();

//   app.disable('x-powered-by');
//   app.use(express.json());

//   app.use(routes);

//   app.use(internalErrors);
//   app.use(globalErrors);

//   return app;
// }

export const app = onRequest(options, server);