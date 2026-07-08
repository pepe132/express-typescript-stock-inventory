import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import handleHttp from "../utils/error.handle";
import { RequestWithUser } from "../middlewares/auth.middleware";

export class AuthController {
  
  static async register(req: Request, res: Response) {
    try {
      const response = await AuthService.registerUser(req.body);
      res.status(201).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al registrar usuario", error);
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const response = await AuthService.loginUser(req.body);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al iniciar sesión", error);
    }
  }

  static async profile(req: RequestWithUser, res: Response) {
    try {
      const userId = req.user?.id;
      const companyId = req.user?.company_id;
      
      if (!userId || !companyId) {
        return res.status(401).json({ message: "No autorizado" });
      }

      const response = await AuthService.getProfile(userId, companyId);
      res.status(200).json(response);
    } catch (error: any) {
      handleHttp(res, error.message || "Error al obtener perfil", error);
    }
  }
}
