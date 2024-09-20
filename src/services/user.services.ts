import { User } from "../interfaces/users.interface"
import { UsersModel } from "../models/users.model"


export const registerNewUserService = async (user:User) => {
    
    const responseCreate = await UsersModel.create(user)
    return responseCreate;

}
