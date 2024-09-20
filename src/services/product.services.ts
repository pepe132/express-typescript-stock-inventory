import { Product } from "../interfaces/product.interface"
import { ProductModel } from "../models/products.model"

export const listProductsService = async() => {
    const responseList = await ProductModel.findAll()
        return responseList

}

export const listProductService = async(id:string) => {
    const responseListById = await ProductModel.findByPk(id)
    return responseListById
}

export const insertProductService = async(product:Product) => {
    const responseInsert =  await ProductModel.create(product)
    return responseInsert
}

export const updateProductService = async(id:string,data:object) => {

    const responseUpdate = await ProductModel.update(
        data,
        { where:{product_id:id} }
    )

    return responseUpdate
    
}
