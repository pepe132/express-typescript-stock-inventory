import { Request, Response } from "express";
import crypto from 'crypto';
import { encrypt, verified } from "../utils/bcrypt.handle";
import { UsersModel } from "../models/users.model";
import { registerNewUserService } from "../services/user.services";
import { generateToken } from "../utils/jwt.handle";

export const registerUser = async (_req:Request,res:Response) => {

    const authUser = _req.body

    const name_user = authUser.user_name.toUpperCase()
    const id_user = crypto.randomBytes(8).toString('hex')

    const passHash = await encrypt(authUser.user_password);

    const userDB = await UsersModel.findOne({where:{email:authUser.email}})
    if (userDB) {
        return res.status(400).json({
            msg:"El usuario ya existe"
        })
        
    }

    const responseUser = {
        ...authUser,
        user_password:passHash,
        user_id:id_user,
        user_name:name_user
    }

    await registerNewUserService(responseUser)
    return res.status(200).json({"message":"El usuario se ha creado con exito "})


};

export const loginUser = async (_req:Request,res:Response) => {

    const user_resp = _req.body;


    const check_is_user = await UsersModel.findOne({where:{email:user_resp.email}})
    if (!check_is_user) {
        return res.status(500).json({"message":"No se encuentra el servidor"})
    }

    const passwordHash = check_is_user.user_password
    const is_correct = await verified(user_resp.user_password,passwordHash)

    console.log(check_is_user.user_id);
    

    const token = generateToken(check_is_user.user_id);

    if(!is_correct){
        return res.status(500).json({"message":"Contraseña incorrecta"})
    } else {

        const data = {
            token,
            user:check_is_user

        }

        return res.status(200).json(data)

    }

};
