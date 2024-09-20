import { Request, RequestHandler, Response } from "express"
import { createRoleService, listRolesService } from "../services/role.service"
import handleHttp from "../utils/error.handle"


export const listRoles: RequestHandler = async (_req: Request,res:Response) => {
    try {

        const response = await listRolesService()
        return res.status(200).json(response)
        
    } catch (error:any) {
        handleHttp(res,'ERROR_LIST_ROLES',error)
         
    }
}

export const createRol: RequestHandler = async (_req: Request, res: Response) => {
    try {
        const {role_name,...data} = _req.body
        const rolName = role_name.toUpperCase()
        const newdata = {
            ...data,
            role_name:rolName

        }
        await createRoleService(newdata)
        return res.status(200).json({"message":"El rol se ha creado con exito se ha creado con éxito"})
        
    } catch (error:any) {
        handleHttp(res,'ERROR_LIST_ROLES',error);
    }
}