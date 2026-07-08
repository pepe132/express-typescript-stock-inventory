import { Request, Response } from "express";
import { CompanyService } from "../services/vendor.service";
import handleHttp from "../utils/error.handle";

export class CompanyController {

  static async create(req: Request, res: Response) {
    try {
      const response = await CompanyService.createCompany(req.body);
      res.status(201).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al crear empresa", error);
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const response = await CompanyService.getAllCompanies();
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al obtener empresas", error);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await CompanyService.getCompanyById(Number(id));
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al obtener empresa", error);
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const response = await CompanyService.updateCompany(Number(id), req.body);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al actualizar empresa", error);
    }
  }
}
