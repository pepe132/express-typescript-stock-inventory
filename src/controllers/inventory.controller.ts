import { Response } from "express";
import { InventoryService } from "../services/inventory.service";
import handleHttp from "../utils/error.handle";
import { RequestWithUser } from "../middlewares/auth.middleware";

export class InventoryController {

  static async getAll(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const response = await InventoryService.getInventory(companyId);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al obtener inventario", error);
    }
  }

  static async getByProduct(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      const { productId } = req.params;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const response = await InventoryService.getInventoryByProduct(Number(productId), companyId);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al obtener inventario por producto", error);
    }
  }

  static async getByWarehouse(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      const { warehouseId } = req.params;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const response = await InventoryService.getInventoryByWarehouse(Number(warehouseId), companyId);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al obtener inventario por almacén", error);
    }
  }
}
