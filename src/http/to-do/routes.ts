import { Router } from "express";
import { handleCreateToDo } from "./useCases/createToDo/index.js";
import { handleDelete } from "./useCases/delete/index.js";
// import { ensureAuthentication } from "@middlewares/ensureAuthentication.js";

const routes = Router();

// routes.use(ensureAuthentication);

/**
 * @openapi
 * /to-do:
 *   post:
 *     summary: Cria uma nova tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *               userId:
 *                 type: integer
 *     responses:
 *       201:
 *         id: integer
 */
routes.post('/', handleCreateToDo);

/**
 * @openapi
 * /to-do:
 *   delete:
 *     summary: Deleta uma tarefa
 *     requestParams:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tarefa excluída com sucesso
 */
routes.delete('/:id', handleDelete);

export default routes;