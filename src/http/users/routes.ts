import {  Router } from "express";
import { handleCreateUser } from "./useCases/createUser";
import { handleGetById } from "./useCases/get-by-id";


const routes = Router();

/**
 * @openapi
 * /users/create:
 *   post:
 *     summary: Criação de um novo usuário
 *     description: Cria um novo usuário com nome, e-mail e senha. A senha deve ter no mínimo 6 caracteres.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome completo do usuário
 *                 example: João da Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Endereço de e-mail válido
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: Senha do usuário (mínimo 6 caracteres)
 *                 example: senha123
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "user_123abc"
 *       401:
 *         description: Requisição inválida (dados mal formatados ou ausentes)
 *       401:
 *         description: E-mail já cadastrado
 */
routes.post('/create', handleCreateUser);

<<<<<<< HEAD
=======

>>>>>>> 8419052 (feat: swagger)
/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     description: Retorna as informações de um usuário a partir de seu ID.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário a ser buscado
 *         example: "user_123abc"
 *     responses:
 *       200:
 *         description: Usuário encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "user_123abc"
 *                 name:
 *                   type: string
 *                   example: "João da Silva"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "joao@email.com"
 *       404:
 *         description: Usuário não encontrado
 */
routes.get('/:id', handleGetById);


export default routes;