import { NextFunction, Request, Response } from "express";

export const checkJwt = (_req:Request,res:Response,next:NextFunction) => {

    try {
        const jwtUser = _req.headers.authorization || null;
        console.log({jwtUser});
        
        next()
    } catch (error) {
        res.status(400).json({"message":"Sesion no valida "})
        
    }

}