import { Router } from "express";
import { CompanyController } from "../controllers/vendor.controller";

const router = Router();

// Estas rutas podrían requerir un Token de "Super Admin" en el futuro
// Por ahora son abiertas para permitir el setup inicial de empresas
router.get("/", CompanyController.getAll);
router.post("/", CompanyController.create);
router.get("/:id", CompanyController.getById);
router.put("/:id", CompanyController.update);

export default router;
