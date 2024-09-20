import { Response } from "express";

const handleHttp = (res:Response, error: string,error_mac:any) => {

    res.status(500).json({error, details:error_mac})

}

export default handleHttp;