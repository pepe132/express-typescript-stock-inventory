import { Table,Model,Column,DataType, HasMany} from "sequelize-typescript";
import { ProductModel } from "./products.model";

@Table({
    timestamps:false,
    tableName:"Categories"
})

export class CategoriesModel extends Model {

    @Column({
        type:DataType.STRING,
        primaryKey: true,
        allowNull:false
    })
    category_id!:string

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

    @HasMany(() => ProductModel)
    products!: ProductModel[];


}