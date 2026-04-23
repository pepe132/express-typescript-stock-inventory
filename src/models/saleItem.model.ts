import {
  Table, Column, Model, DataType,
  PrimaryKey, AutoIncrement, ForeignKey, BelongsTo
} from "sequelize-typescript";
import { Sale } from "./sales.model";
import { ProductModel } from "./products.model";

@Table({
  tableName: "Sale_items",
  timestamps: true,
  paranoid: true,
  underscored: true
})
export class SaleItem extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Sale)
  @Column
  sale_id!: number;

  @BelongsTo(() => Sale)
  sale!: Sale;

  @ForeignKey(() => ProductModel)
  @Column
  product_id!: number;

  @Column(DataType.INTEGER)
  quantity!: number;

  @Column(DataType.FLOAT)
  price!: number;

  @Column(DataType.FLOAT)
  subtotal!: number;
}