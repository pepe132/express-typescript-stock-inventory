import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { authMiddleware, injectUser } from "../middlewares/auth.middleware";

const router = Router();

// Todas las rutas de productos requieren autenticación
router.use(authMiddleware);
router.use(injectUser);

router.get("/", ProductController.getAll);
router.post("/", ProductController.create);
router.get("/:id", ProductController.getById);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

export default router;
