import { Request, RequestHandler, Response } from "express";
import { insertVendorService, listVendorsService } from "../services/vendor.service";
import handleHttp from "../utils/error.handle";
import crypto from 'crypto';

export const listVendors: RequestHandler = async (_req: Request,res:Response) => {
    try {
        const response = await listVendorsService();
        return res.status(200).json(response)

    } catch (error:any) {

        handleHttp(res,'ERROR_LIST_VENDORS',error)
    }
}

export const insertVendor : RequestHandler = async (_req: Request,res:Response) => {
    try {
        const {vendor_name, ...data} = _req.body;

        const name = vendor_name.toUpperCase()
        const vendor_id = crypto.randomBytes(16).toString('hex')

        const new_data = {
            vendor_name:name,
            vendor_id,
            ...data
        }

        await insertVendorService(new_data);
        return res.status(200).json({"message":"El registro se ha creado con exito"})
        
    } catch (error) {
        handleHttp(res,'ERROR_INSERT_VENDORS',error)
    }
}