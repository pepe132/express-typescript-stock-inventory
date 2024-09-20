import {  Response } from "express"
import { Category } from "../interfaces/category.interface"
import { CategoriesModel } from "../models/categories.model"
import crypto from 'crypto';

export const listCategoriesService = async() => {
    const responseList = await CategoriesModel.findAll()
        return responseList

}

export const insertCategoriesService = async(category: Category, res:Response) => {
    const name_category  = category.category_name.toUpperCase()
    const id_category  = crypto.randomBytes(16).toString('hex')

    const categoriaDB = await CategoriesModel.findOne({where: {category_name:name_category }})

    if (categoriaDB) {//si categoria db no es nula
        return res.status(400).json({
            msg:"La categoria ya existe"
        }) 
    }

    const data = {
        ...category,
        category_id:id_category,
        category_name:name_category
    }

    const responseInsert = await CategoriesModel.create(data);
    return responseInsert
    
}

export const updateCategoriesService = async(id:string,data:object) => {

    const responseUpdate = await CategoriesModel.update(
        data,
        { where:{category_id:id} }
    )

    return responseUpdate
    
}

export const deleteCategoriesService = async(id:string) => {
    const responseDelete = await CategoriesModel.destroy({
        where: {
            category_id:id
        }
    })

    return responseDelete;
}