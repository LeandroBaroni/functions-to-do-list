import { Router } from "express";
import { handleCreateToDo } from "./useCases/createToDo/index.js";
import { handleDelete } from "./useCases/delete/index.js";
import { ensureAuthentication } from "src/core/middlewares/ensureAuthentication.js";
import { handleGet } from "./useCases/get/index.js";
import { handleUpdate } from "./useCases/update/index.js";

const routes = Router();

routes.use(ensureAuthentication);

/**
 * @openapi
 * /to-do/:
 *   get:
 *     summary: Lista todos os itens do usuário autenticado
 *     description: Retorna uma lista de itens To-Do associados ao usuário autenticado.
 *     tags:
 *       - To-Do
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de itens To-Do retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ToDo'
 *       403:
 *         description: Sem permissão para acessar os itens
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

routes.get('/', handleGet);

/**
 * @openapi
 * /to-do/:
 *   put:
 *     summary: Marca um item como concluído
 *     description: Atualiza o status de um item To-Do para "concluído", com base no ID fornecido.
 *     tags:
 *       - To-Do
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID do item a ser marcado como completo
 *                 example: "1a2b3c"
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 description:
 *                   type: string
 *                   example: "Tarefa marcada como completa!"
 *       400:
 *         description: Requisição inválida
 *       403:
 *         description: Sem permissão
 *       404:
 *         description: Item não encontrado
 */
routes.put('/', handleUpdate);

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