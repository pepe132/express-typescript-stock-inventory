import { Request, RequestHandler, Response } from "express";
import handleHttp from "../utils/error.handle";
import { insertProductService, listProductService, listProductsService, updateProductService } from "../services/product.services";
import { CategoriesModel } from "../models/categories.model";
import crypto from 'crypto';


export const listProducts: RequestHandler = async (_req: Request,res:Response) => {
    try {
        const response = await listProductsService()
        return res.status(200).json(response)
    } catch (error:any) {
        handleHttp(res,'ERROR_LIST_PRODUCTS',error)
    }
}

export const listProduct: RequestHandler = async (_req:Request , res:Response) => {
    try {
        const {id} = _req.params
        
        const response = await listProductService(id)
        return res.status(200).json(response)
        
    } catch (error:any) {
        handleHttp(res,'ERROR_LIST_PRODUCT_by_ID',error)
        
    }
}

export const insertProducts : RequestHandler = async (_req: Request , res: Response) => {
    try {

        const { category_id, product_name:name , ...data } = _req.body;

        const product_name  = name.toUpperCase()
        const product_id = crypto.randomBytes(16).toString('hex')

        if (!product_id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const category = await CategoriesModel.findByPk(category_id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        const category_name = category.category_name; 

        const newdata = {
            category_id,
            product_name,
            product_id,
            category_name,
            ...data
        } 

        await insertProductService(newdata)
        return res.status(200).json({"message":"El registro se ha creado con exito"})
        
    } catch (error:any) {
        handleHttp(res,'ERROR_INSERT_PRODUCTS',error)
           
    }
}

export const updateProducts : RequestHandler = async (_req: Request , res: Response) => {

    try {

        const {id} = _req.params
        let {product_name, category_id, ...data} =_req.body;

        const product = product_name.toUpperCase();

        let category_name;

        if (category_id) {
            const category = await CategoriesModel.findByPk(category_id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            category_name = category.category_name;
        }

        const data_updated = {
            product_name:product,
            category_id,
            category_name,
            ...data
        }

        await updateProductService(id,data_updated);

        return res.status(200).json({"message":"El registro se ha actualizado"})
        
    } catch (error) {
        handleHttp(res,'ERROR_UPDATE_PRODUCT',error)

     
    }
}

