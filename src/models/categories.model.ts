import { Table,Model,Column,DataType, HasMany, ForeignKey} from "sequelize-typescript";
import { ProductModel } from "./products.model";
import { VendorsModel } from "./vendors.model";

@Table({
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName:"Categories"
})

export class CategoriesModel extends Model {

    @Column({
        type:DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    category_id!:number

    @Column({
        type:DataType.STRING,
        allowNull:false,
        
    })
    category_name!:string

    @Column({
        type:DataType.BOOLEAN,
        allowNull:false
    })
    status_category!:boolean

    @ForeignKey(() => VendorsModel)
    @Column
    company_id!: number;

    @HasMany(() => ProductModel)
    products!: ProductModel[];


}