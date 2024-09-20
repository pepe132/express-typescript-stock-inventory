import { Router } from "express";
import { createRol, listRoles } from "../controllers/roles.controller";

const RolesRoutes = Router();

RolesRoutes.get('/all',listRoles)
RolesRoutes.post('/insert_rol',createRol)

export default RolesRoutes;
