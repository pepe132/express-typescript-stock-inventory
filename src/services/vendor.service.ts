import { VendorsModel } from "../models/vendors.model";
import { CreateCompanyDTO, UpdateCompanyDTO } from "../interfaces/vendors.interface";

export class CompanyService {
  
  static async createCompany(data: CreateCompanyDTO) {
    const existing = await VendorsModel.findOne({ 
      where: { company_name: data.company_name } 
    });

    if (existing) {
      throw new Error("Ya existe una empresa registrada con este nombre");
    }

    const newCompany = await VendorsModel.create({
      company_name: data.company_name
    });

    return newCompany;
  }

  static async getCompanyById(id: number) {
    const company = await VendorsModel.findByPk(id);
    if (!company) {
      throw new Error("Empresa no encontrada");
    }
    return company;
  }

  static async getAllCompanies() {
    return await VendorsModel.findAll();
  }

  static async updateCompany(id: number, data: UpdateCompanyDTO) {
    const company = await VendorsModel.findByPk(id);
    if (!company) {
      throw new Error("Empresa no encontrada");
    }
    await company.update(data);
    return company;
  }
}
