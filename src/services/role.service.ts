import { role } from "../interfaces/roles.interface";
import { RolesModel } from "../models/role.model";

export const listRolesService = async() => {
    const responseRole = await RolesModel.findAll();
    return responseRole; 
}

export const createRoleService = async (rol:role) => {
    const responseInsert =  await RolesModel.create(rol)
    return responseInsert

}