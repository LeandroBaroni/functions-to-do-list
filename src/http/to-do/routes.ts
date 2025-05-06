import { Router } from "express";
import { handleCreateToDo } from "./useCases/createToDo/index.js";
import { handleDelete } from "./useCases/delete/index.js";

const routes = Router();

routes.post('/', handleCreateToDo);
routes.delete('/:id', handleDelete);

export default routes;