import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProductModel } from "./products.model";
import { Warehouse } from "./warehouse.model";

@Table({
  tableName: "Inventory",
  timestamps: true,
  paranoid: true,
  underscored: true
})
export class Inventory extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  inventory_id!: number;

  @ForeignKey(() => ProductModel)
  @Column
  product_id!: number;

  @BelongsTo(() => ProductModel)
  product!: ProductModel;

  @ForeignKey(() => Warehouse)
  @Column
  warehouse_id!: number;

  @BelongsTo(() => Warehouse)
  warehouse!: Warehouse;

  @Column(DataType.INTEGER)
  stock!: number;

  @Column(DataType.INTEGER)
  min_stock!: number;
}