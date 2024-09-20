
import { sign} from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET || 'token.3eljwt'

export const generateToken = (id:string) => {
    const jwt = sign({id},jwt_secret,{
        expiresIn:"2h"
    });

    return jwt;

}


// export const verifyToken = async () =>{

// }