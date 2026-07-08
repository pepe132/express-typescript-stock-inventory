import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware, injectUser } from "../middlewares/auth.middleware";

const router = Router();

// Todas las rutas de usuarios requieren autenticación e inyección de contexto de usuario
router.use(authMiddleware);
router.use(injectUser);

router.get("/", UserController.getAll);
router.post("/", UserController.create);
router.get("/:id", UserController.getById);
router.put("/:id", UserController.update);
router.delete("/:id", UserController.delete);
router.patch("/:id/role", UserController.updateRole);

export default router;
