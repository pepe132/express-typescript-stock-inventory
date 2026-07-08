import { Response } from "express";
import { CategoryService } from "../services/category.services";
import handleHttp from "../utils/error.handle";
import { RequestWithUser } from "../middlewares/auth.middleware";

export class CategoryController {

  static async getAll(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const response = await CategoryService.getCategoriesByCompany(companyId);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al obtener categorías", error);
    }
  }

  static async create(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const data = { ...req.body, company_id: companyId };
      const response = await CategoryService.createCategory(data);
      res.status(201).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al crear categoría", error);
    }
  }

  static async getById(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      const { id } = req.params;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const response = await CategoryService.getCategoryById(Number(id), companyId);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al obtener categoría", error);
    }
  }

  static async update(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      const { id } = req.params;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const response = await CategoryService.updateCategory(Number(id), companyId, req.body);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al actualizar categoría", error);
    }
  }

  static async delete(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      const { id } = req.params;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const response = await CategoryService.deleteCategory(Number(id), companyId);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al eliminar categoría", error);
    }
  }
}
