import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { authMiddleware, injectUser } from "../middlewares/auth.middleware";

const router = Router();

// Todas las rutas de categorías requieren autenticación
router.use(authMiddleware);
router.use(injectUser);

router.get("/", CategoryController.getAll);
router.post("/", CategoryController.create);
router.get("/:id", CategoryController.getById);
router.put("/:id", CategoryController.update);
router.delete("/:id", CategoryController.delete);

export default router;
