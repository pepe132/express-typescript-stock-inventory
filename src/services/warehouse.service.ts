import { Warehouse } from "../models/warehouse.model";
import { CreateWarehouseDTO, UpdateWarehouseDTO } from "../interfaces/warehouse.interface";
import { InventoryService } from "./inventory.service";

export class WarehouseService {
  
  static async createWarehouse(data: CreateWarehouseDTO) {
    const sequelize = Warehouse.sequelize!;
    const t = await sequelize.transaction();

    try {
      // 1. Validar nombre único para la empresa
      const existing = await Warehouse.findOne({
        where: { 
          warehouse_name: data.name, 
          company_id: data.company_id 
        },
        transaction: t
      });

      if (existing) {
        throw new Error("Ya existe un almacén con este nombre en su empresa");
      }

      // 2. Crear almacén
      const newWarehouse = await Warehouse.create({
        warehouse_name: data.name,
        warehouse_location: data.location,
        company_id: data.company_id
      }, { transaction: t });

      // 3. INICIALIZACIÓN AUTOMÁTICA DE INVENTARIO
      await InventoryService.createInventoryForNewWarehouse(newWarehouse.warehouse_id, data.company_id, t);

      await t.commit();
      return newWarehouse;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  static async getWarehousesByCompany(companyId: number) {
    return await Warehouse.findAll({
      where: { company_id: companyId }
    });
  }

  static async getWarehouseById(warehouseId: number, companyId: number) {
    const warehouse = await Warehouse.findOne({
      where: { warehouse_id: warehouseId, company_id: companyId }
    });

    if (!warehouse) throw new Error("Almacén no encontrado");
    return warehouse;
  }

  static async updateWarehouse(warehouseId: number, companyId: number, data: UpdateWarehouseDTO) {
    const warehouse = await Warehouse.findOne({
      where: { warehouse_id: warehouseId, company_id: companyId }
    });

    if (!warehouse) throw new Error("Almacén no encontrado");

    const updateData: any = {};
    if (data.name) updateData.warehouse_name = data.name;
    if (data.location) updateData.warehouse_location = data.location;

    await warehouse.update(updateData);
    return warehouse;
  }

  static async deleteWarehouse(warehouseId: number, companyId: number) {
    const warehouse = await Warehouse.findOne({
      where: { warehouse_id: warehouseId, company_id: companyId }
    });

    if (!warehouse) throw new Error("Almacén no encontrado");

    await warehouse.destroy();
    return { message: "Almacén eliminado correctamente" };
  }
}
