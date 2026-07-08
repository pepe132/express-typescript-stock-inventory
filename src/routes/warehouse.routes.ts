import { Router } from "express";
import { WarehouseController } from "../controllers/warehouse.controller";
import { authMiddleware, injectUser } from "../middlewares/auth.middleware";

const router = Router();

// Todas las rutas de almacenes requieren autenticación e inyección de contexto
router.use(authMiddleware);
router.use(injectUser);

router.get("/", WarehouseController.getAll);
router.post("/", WarehouseController.create);
router.get("/:id", WarehouseController.getById);
router.put("/:id", WarehouseController.update);
router.delete("/:id", WarehouseController.delete);

export { router };
