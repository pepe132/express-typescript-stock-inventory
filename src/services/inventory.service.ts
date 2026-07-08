import { Inventory } from "../models/inventory.model";
import { ProductModel } from "../models/products.model";
import { Warehouse } from "../models/warehouse.model";
import { CategoriesModel } from "../models/categories.model";
import { Transaction } from "sequelize";

export class InventoryService {

  /**
   * Obtener todo el inventario de la empresa
   */
  static async getInventory(companyId: number) {
    return await Inventory.findAll({
      where: { company_id: companyId },
      include: [
        { 
          model: ProductModel, 
          include: [{ model: CategoriesModel, attributes: ['category_name'] }] 
        },
        { model: Warehouse }
      ]
    });
  }

  /**
   * Obtener stock de un producto en todos los almacenes
   */
  static async getInventoryByProduct(productId: number, companyId: number) {
    return await Inventory.findAll({
      where: { product_id: productId, company_id: companyId },
      include: [{ model: Warehouse }]
    });
  }

  /**
   * Obtener stock de todos los productos en un almacén específico
   */
  static async getInventoryByWarehouse(warehouseId: number, companyId: number) {
    return await Inventory.findAll({
      where: { warehouse_id: warehouseId, company_id: companyId },
      include: [{ 
        model: ProductModel,
        include: [{ model: CategoriesModel, attributes: ['category_name'] }]
      }]
    });
  }

  // --- FUNCIONES DE INICIALIZACIÓN (USO INTERNO) ---

  /**
   * Crea registros de inventario para un nuevo producto en todos los almacenes existentes
   */
  static async createInventoryForNewProduct(productId: number, companyId: number, t?: Transaction) {
    const warehouses = await Warehouse.findAll({ where: { company_id: companyId } });
    
    const inventoryRecords = warehouses.map(w => ({
      product_id: productId,
      warehouse_id: w.warehouse_id,
      company_id: companyId,
      stock: 0,
      min_stock: 5
    }));

    if (inventoryRecords.length > 0) {
      await Inventory.bulkCreate(inventoryRecords, { transaction: t, ignoreDuplicates: true });
    }
  }

  /**
   * Crea registros de inventario para un nuevo almacén para todos los productos existentes
   */
  static async createInventoryForNewWarehouse(warehouseId: number, companyId: number, t?: Transaction) {
    const products = await ProductModel.findAll({ where: { company_id: companyId } });
    
    const inventoryRecords = products.map(p => ({
      product_id: p.product_id,
      warehouse_id: warehouseId,
      company_id: companyId,
      stock: 0,
      min_stock: 5
    }));

    if (inventoryRecords.length > 0) {
      await Inventory.bulkCreate(inventoryRecords, { transaction: t, ignoreDuplicates: true });
    }
  }
}
