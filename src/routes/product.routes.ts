import { Router } from "express";
import { insertProducts, listProduct, listProducts, updateProducts } from "../controllers/product.controller";


const ProductRoutes = Router();

ProductRoutes.get('/all',listProducts)
ProductRoutes.get('/:id',listProduct)
ProductRoutes.post('/insert',insertProducts)
ProductRoutes.put('/update/:id',updateProducts)

export default ProductRoutes