import { Router } from "express";
import { handleCreateUser } from "./useCases/createUser";

const routes = Router();

routes.post('/create', handleCreateUser);

export default routes;