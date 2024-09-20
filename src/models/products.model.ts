import { Table,Model,Column,DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import { CategoriesModel } from "./categories.model";

@Table({
    timestamps:false,
    tableName:"Products"
})

export class ProductModel extends Model {

    @Column({
        type:DataType.STRING,
        primaryKey: true,
        allowNull:false,
        
    })
    product_id!:string

    @Column({
        type:DataType.STRING,
        allowNull:false,
        
    })
    product_name!:string

    @ForeignKey(() => CategoriesModel)
    @Column({
        type: DataType.STRING,
        allowNull: false,

        
    })
    category_id!: string;

    @BelongsTo(() => CategoriesModel)
    category!: CategoriesModel;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    details!:string

    @Column({
        type:DataType.BOOLEAN,
        allowNull:false
    })
    status_product!:boolean

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    product_code!:string

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    category_name!: string; 



}