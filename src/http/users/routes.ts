import {  Router } from "express";
import { handleCreateUser } from "./useCases/createUser";
import { handleGetById } from "./useCases/get-by-id";


const routes = Router();

routes.post('/create', handleCreateUser);
routes.get('/:id', handleGetById);


export default routes;