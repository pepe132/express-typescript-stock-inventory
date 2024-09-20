import { Request, RequestHandler, Response} from "express";
import handleHttp from "../utils/error.handle";
import { deleteCategoriesService, insertCategoriesService, listCategoriesService, updateCategoriesService } from "../services/category.services";

export const listCategories: RequestHandler = async (_req: Request,res:Response) => {
    try {
        const response = await listCategoriesService()
        return res.status(200).json(response)
    } catch (error:any) {
        handleHttp(res,'ERROR_LIST_CATEGORIES',error)
    }

}

export const insertCategory: RequestHandler = async (_req: Request,res:Response) => {
    try {

        await insertCategoriesService(_req.body,res)
        return res.status(200).json({"message":"La categoria se ha creado con éxito"})
        
    } catch (error:any) {
        handleHttp(res,'ERROR_INSERT_PRODUCT(S)',error)
        
    }
}


export const updateCategory : RequestHandler = async (_req: Request , res: Response) => {
    try {

        const {id} = _req.params
        let {category_name:category, status_category} =_req.body;

        const category_name = category.toUpperCase();

        const data = {
            category_name,
            status_category
        }

        await updateCategoriesService(id,data);

        return res.status(200).json({"message":"El registro se ha actualizado"})
        
    } catch (error) {
        handleHttp(res,'ERROR_UPDATE_CATEGORY',error)

     
    }
}

export const deleteCategory : RequestHandler = async(_req: Request , res: Response) => {
    try {
        const {id} = _req.params
        await deleteCategoriesService(id)
        return res.status(200).json({"message":"El registro se ha eliminado"})

        
    } catch (error) {
        handleHttp(res,'ERROR_DELETE_CATEGORY',error)
    }
}
