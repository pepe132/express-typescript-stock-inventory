import {
  Table, Column, Model, DataType,
  PrimaryKey, AutoIncrement, ForeignKey
} from "sequelize-typescript";
import { VendorsModel } from "./vendors.model";

@Table({
  tableName: "Warehouses",
  timestamps: true,
  paranoid: true,
  underscored: true
})
export class Warehouse extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  warehouse_id!: number;

  @Column
  warehouse_name!: string;

  @Column
  warehouse_location!: string;

  @ForeignKey(() => VendorsModel)
  @Column
  company_id!: number;
}