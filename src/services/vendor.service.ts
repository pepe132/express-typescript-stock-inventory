import { vendor } from "../interfaces/vendors.interface";
import { VendorsModel } from "../models/vendors.model"

export const listVendorsService = async() => {
    const responseList = await VendorsModel.findAll()
    return responseList;
}

export const insertVendorService = async(vendor:vendor) => {
    const responseInsert = await VendorsModel.create(vendor)
    return responseInsert;
}