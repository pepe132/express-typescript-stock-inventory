import { Response } from "express";
import { UserService } from "../services/user.service";
import handleHttp from "../utils/error.handle";
import { RequestWithUser } from "../middlewares/auth.middleware";

export class UserController {

  static async create(req: RequestWithUser, res: Response) {
    try {
      // Forzar company_id del usuario autenticado para seguridad multi-tenant
      const companyId = req.user?.company_id;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const data = { ...req.body, company_id: companyId };
      const response = await UserService.createUser(data);
      res.status(201).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al crear usuario", error);
    }
  }

  static async getAll(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const response = await UserService.getUsersByCompany(companyId);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al obtener usuarios", error);
    }
  }

  static async getById(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      const { id } = req.params;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const response = await UserService.getUserById(Number(id), companyId);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al obtener usuario", error);
    }
  }

  static async update(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      const { id } = req.params;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const response = await UserService.updateUser(Number(id), companyId, req.body);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al actualizar usuario", error);
    }
  }

  static async delete(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      const { id } = req.params;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const response = await UserService.deleteUser(Number(id), companyId);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al eliminar usuario", error);
    }
  }

  static async updateRole(req: RequestWithUser, res: Response) {
    try {
      const companyId = req.user?.company_id;
      const { id } = req.params;
      const { role_id } = req.body;
      if (!companyId) return res.status(401).json({ message: "No autorizado" });

      const response = await UserService.changeUserRole(Number(id), companyId, Number(role_id));
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al cambiar rol", error);
    }
  }
}
