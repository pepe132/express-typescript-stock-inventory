import { ProductModel } from "../models/products.model";
import { CategoriesModel } from "../models/categories.model";
import { CreateProductDTO, UpdateProductDTO, ProductFilterDTO } from "../interfaces/product.interface";
import { Op } from "sequelize";
import { InventoryService } from "./inventory.service";
import connectionDB from "../config/connection"; // Para obtener la instancia de sequelize o usar el modelo

export class ProductService {
  
  static async createProduct(data: CreateProductDTO) {
    const { category_id, company_id, sku } = data;

    // Obtener la instancia de sequelize para la transacción
    const sequelize = ProductModel.sequelize!;
    const t = await sequelize.transaction();

    try {
      // 1. Validar que la categoría exista
      const category = await CategoriesModel.findOne({
        where: { category_id, company_id },
        transaction: t
      });
      if (!category) {
        throw new Error("La categoría especificada no existe para esta empresa");
      }

      // 2. Validar SKU único
      const skuExists = await ProductModel.findOne({
        where: { sku, company_id },
        transaction: t
      });
      if (skuExists) {
        throw new Error("El SKU ya está en uso en esta empresa");
      }

      // 3. Crear producto
      const newProduct = await ProductModel.create({
        product_name: data.name,
        description: data.description,
        price: data.price,
        cost: data.cost,
        sku: data.sku,
        status_product: true,
        category_id: data.category_id,
        company_id: data.company_id,
        category_name: category.category_name
      }, { transaction: t });

      // 4. INICIALIZACIÓN AUTOMÁTICA DE INVENTARIO
      await InventoryService.createInventoryForNewProduct(newProduct.product_id, company_id, t);

      await t.commit();
      return newProduct;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  static async getProducts(companyId: number, filters: ProductFilterDTO) {
    const { category_id, name, sku } = filters;
    const where: any = { company_id: companyId };

    if (category_id) where.category_id = category_id;
    if (sku) where.sku = { [Op.like]: `%${sku}%` };
    if (name) where.product_name = { [Op.like]: `%${name}%` };

    return await ProductModel.findAll({
      where,
      include: [
        { model: CategoriesModel, attributes: ['category_name'] }
      ]
    });
  }

  static async getProductById(productId: number, companyId: number) {
    const product = await ProductModel.findOne({
      where: { product_id: productId, company_id: companyId },
      include: [{ model: CategoriesModel, attributes: ['category_name'] }]
    });

    if (!product) throw new Error("Producto no encontrado");
    return product;
  }

  static async updateProduct(productId: number, companyId: number, data: UpdateProductDTO) {
    const product = await ProductModel.findOne({
      where: { product_id: productId, company_id: companyId }
    });

    if (!product) throw new Error("Producto no encontrado");

    if (data.category_id) {
      const category = await CategoriesModel.findOne({
        where: { category_id: data.category_id, company_id: companyId }
      });
      if (!category) throw new Error("La categoría especificada no existe");
      (product as any).category_name = category.category_name;
    }

    if (data.sku && data.sku !== product.sku) {
      const skuExists = await ProductModel.findOne({
        where: { sku: data.sku, company_id: companyId }
      });
      if (skuExists) throw new Error("El SKU ya está en uso");
    }

    const updateData: any = { ...data };
    if (data.name) {
      updateData.product_name = data.name;
      delete updateData.name;
    }

    await product.update(updateData);
    return product;
  }

  static async deleteProduct(productId: number, companyId: number) {
    const product = await ProductModel.findOne({
      where: { product_id: productId, company_id: companyId }
    });

    if (!product) throw new Error("Producto no encontrado");

    await product.destroy();
    return { message: "Producto eliminado correctamente" };
  }
}
