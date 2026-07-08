import { NextFunction, Request, Response } from "express";
import { verifyToken, TokenPayload } from "../utils/jwt.handle";

export interface RequestWithUser extends Request {
  user?: TokenPayload;
}

export const authMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const jwtHeader = req.header('Authorization');
    if (!jwtHeader) {
      return res.status(401).json({ message: "No se proporcionó token de autenticación" });
    }

    const token = jwtHeader.split(' ').pop(); // Bearer <token>
    if (!token) {
      return res.status(401).json({ message: "Formato de token inválido" });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }

    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Sesión no válida" });
  }
};

/**
 * Middleware para asegurar que req.user existe antes de procesar la lógica de negocio.
 * Útil para inyectar datos del usuario en los servicios.
 */
export const injectUser = (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "Información de usuario no encontrada en la petición" });
  }
  next();
};
