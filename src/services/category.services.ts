import { CategoriesModel } from "../models/categories.model";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../interfaces/category.interface";

export class CategoryService {
  
  static async createCategory(data: CreateCategoryDTO) {
    // Validar nombre único por empresa
    const existing = await CategoriesModel.findOne({
      where: { 
        category_name: data.category_name, 
        company_id: data.company_id 
      }
    });

    if (existing) {
      throw new Error("Ya existe una categoría con este nombre en su empresa");
    }

    const newCategory = await CategoriesModel.create({
      category_name: data.category_name,
      company_id: data.company_id,
      status_category: true
    });

    return newCategory;
  }

  static async getCategoriesByCompany(companyId: number) {
    return await CategoriesModel.findAll({
      where: { company_id: companyId }
    });
  }

  static async getCategoryById(categoryId: number, companyId: number) {
    const category = await CategoriesModel.findOne({
      where: { category_id: categoryId, company_id: companyId }
    });

    if (!category) {
      throw new Error("Categoría no encontrada");
    }

    return category;
  }

  static async updateCategory(categoryId: number, companyId: number, data: UpdateCategoryDTO) {
    const category = await CategoriesModel.findOne({
      where: { category_id: categoryId, company_id: companyId }
    });

    if (!category) {
      throw new Error("Categoría no encontrada");
    }

    // Si se intenta cambiar el nombre, validar que no choque con otra
    if (data.category_name && data.category_name !== category.category_name) {
      const existing = await CategoriesModel.findOne({
        where: { 
          category_name: data.category_name, 
          company_id: companyId 
        }
      });
      if (existing) {
        throw new Error("Ya existe otra categoría con este nombre");
      }
    }

    await category.update(data);
    return category;
  }

  static async deleteCategory(categoryId: number, companyId: number) {
    const category = await CategoriesModel.findOne({
      where: { category_id: categoryId, company_id: companyId }
    });

    if (!category) {
      throw new Error("Categoría no encontrada");
    }

    // Nota: El soft delete funcionará por el paranoid: true en el modelo
    await category.destroy();
    return { message: "Categoría eliminada correctamente" };
  }
}
