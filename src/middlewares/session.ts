import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";

export const checkJwt = (_req:Request,res:Response,next:NextFunction) => {

    try {
        const jwtUser = _req.header('x-token')|| null;
     
        const isOk = verifyToken(`${jwtUser}`)
        
        if (!isOk) {
            res.status(401).json({"message":"No tienes un token valido "})
            
        }else {

            next()
        }
    } catch (error) {
        res.status(400).json({"message":error})
        
    }

}