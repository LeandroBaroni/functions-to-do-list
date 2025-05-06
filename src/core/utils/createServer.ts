import express from 'express';
import 'express-async-errors';
import { globalErrors } from '@middlewares/globalErrors';
import { internalErrors } from '@middlewares/internalErrors';

/**
 * Cria e configura um servidor `Express` com as rotas fornecidas.
 *
 * Esta função realiza as seguintes operações:
 * 1. Cria uma nova instância do aplicativo `Express`.
 * 2. Desativa o cabeçalho 'x-powered-by' por razões de segurança.
 * 3. Configura o middleware para processar JSON no corpo das requisições.
 * 4. Adiciona as rotas fornecidas ao servidor.
 * 5. Configura middlewares de tratamento de erros (internos e globais).
 *
 * @param routes Um objeto `Router` do `Express` contendo as rotas a serem adicionadas ao servidor.
 * @returns Um objeto `Express` representando o servidor criado.
 */
export function createServer (routes: express.Router): express.Express {
  console.log('a')
  const app = express();

  app.disable('x-powered-by');

  app.use(express.json());

  app.use(routes);

  app.use(internalErrors);

  app.use(globalErrors);

  return app;
}