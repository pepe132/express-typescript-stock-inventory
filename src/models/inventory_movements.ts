import {
  Table, Column, Model, DataType,
  PrimaryKey, AutoIncrement, ForeignKey
} from "sequelize-typescript";
import { ProductModel } from "./products.model";
import { Warehouse } from "./warehouse.model";
import { UsersModel } from "./users.model";

@Table({
  tableName: "Inventory_movements",
  timestamps: true,
  paranoid: true,
  underscored: true
})
export class InventoryMovement extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  inventory_mov_id!: number;

  @ForeignKey(() => ProductModel)
  @Column
  product_id!: number;

  @ForeignKey(() => Warehouse)
  @Column
  warehouse_id!: number;

  @Column(DataType.ENUM("IN", "OUT"))
  type!: "IN" | "OUT";

  @Column(DataType.INTEGER)
  quantity!: number;

  @Column
  reason!: string;

  @Column
  reference_id!: number;

  @ForeignKey(() => UsersModel)
  @Column
  user_id!: number;
}