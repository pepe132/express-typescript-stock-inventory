import { Response } from "express";
import { WarehouseService } from "../services/warehouse.service";
import handleHttp from "../utils/error.handle";
import { RequestWithUser } from "../middlewares/auth.middleware";

export class WarehouseController {

  static async getAll(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const response = await WarehouseService.getWarehousesByCompany(companyId);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al obtener almacenes", error);
    }
  }

  static async create(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const data = { ...req.body, company_id: companyId };
      const response = await WarehouseService.createWarehouse(data);
      res.status(201).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al crear almacén", error);
    }
  }

  static async getById(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      const { id } = req.params;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const response = await WarehouseService.getWarehouseById(Number(id), companyId);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al obtener almacén", error);
    }
  }

  static async update(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      const { id } = req.params;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const response = await WarehouseService.updateWarehouse(Number(id), companyId, req.body);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al actualizar almacén", error);
    }
  }

  static async delete(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      const { id } = req.params;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const response = await WarehouseService.deleteWarehouse(Number(id), companyId);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al eliminar almacén", error);
    }
  }
}
