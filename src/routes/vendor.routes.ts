import { Router } from "express";
import { insertVendor, listVendors } from "../controllers/vendor.controller";

const VendorsRoutes = Router();

VendorsRoutes.get('/all',listVendors);
VendorsRoutes.post('/insert_vendor',insertVendor)

export default VendorsRoutes;