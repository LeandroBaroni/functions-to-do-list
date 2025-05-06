import { Router } from "express";
console.log(1)
import { handleCreateUser } from "./useCases/createUser/index";
console.log(2)

const routes = Router();
console.log(3)

routes.post('/create', handleCreateUser);
console.log(4)


export default routes;