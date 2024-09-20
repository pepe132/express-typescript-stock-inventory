import { Router } from "express";
import { deleteCategory, insertCategory, listCategories, updateCategory } from "../controllers/category.controller";
import { checkJwt } from "../middlewares/session";


const CategoryRoutes = Router();

CategoryRoutes.get('/all',checkJwt,listCategories)
CategoryRoutes.post('/insert',insertCategory)
CategoryRoutes.put('/:id',updateCategory)
CategoryRoutes.delete('/:id',deleteCategory)


export default CategoryRoutes;

