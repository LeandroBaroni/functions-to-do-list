import {  Router } from "express";
import { handleCreateUser } from "./useCases/createUser";


const routes = Router();
console.log(3)

routes.post('/create', handleCreateUser);
console.log(4)


export default routes;