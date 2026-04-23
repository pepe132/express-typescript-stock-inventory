import {
  Table, Column, Model, DataType,
  PrimaryKey, AutoIncrement, ForeignKey, HasMany
} from "sequelize-typescript";
import { UsersModel } from "./users.model";
import { VendorsModel } from "./vendors.model";
import { SaleItem } from "./saleItem.model";

@Table({
  tableName: "Sales",
  timestamps: true,
  paranoid: true,
  underscored: true
})
export class Sale extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  sale_id!: number;

  @ForeignKey(() => VendorsModel)
  @Column
  company_id!: number;

  @ForeignKey(() => UsersModel)
  @Column
  user_id!: number;

  @Column(DataType.FLOAT)
  total!: number;

  @HasMany(() => SaleItem)
  items!: SaleItem[];
}