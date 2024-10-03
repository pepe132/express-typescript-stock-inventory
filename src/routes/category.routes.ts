import { Router } from "express";
import { deleteCategory, insertCategory, listCategories, updateCategory } from "../controllers/category.controller";
import { checkJwt } from "../middlewares/session";


const CategoryRoutes = Router();

CategoryRoutes.get('/all',checkJwt,listCategories)
CategoryRoutes.post('/insert',checkJwt,insertCategory)
CategoryRoutes.put('/:id',checkJwt,updateCategory)
CategoryRoutes.delete('/:id',checkJwt,deleteCategory)


export default CategoryRoutes;

