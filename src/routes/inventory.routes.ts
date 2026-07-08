import { Router } from "express";
import { InventoryController } from "../controllers/inventory.controller";
import { authMiddleware, injectUser } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.use(injectUser);

router.get("/", InventoryController.getAll);
router.get("/product/:productId", InventoryController.getByProduct);
router.get("/warehouse/:warehouseId", InventoryController.getByWarehouse);

export { router };
