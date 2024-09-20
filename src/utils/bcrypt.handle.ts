import { compare, hash} from "bcryptjs";

export const encrypt = async (pass:string) => {

    const password = await hash(pass,8)
    return password;

}

export const verified = async ( pass:string, passHash:string ) => {

    const isCorrect = await compare(pass,passHash);
    return isCorrect;

}