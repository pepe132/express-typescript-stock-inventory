import { NextFunction, Request, Response } from "express";

export const logMiddleware = (_req: Request, res:Response, next: NextFunction) => {
    
    next()

}