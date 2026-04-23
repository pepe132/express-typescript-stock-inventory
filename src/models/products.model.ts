import { Table,Model,Column,DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import { CategoriesModel } from "./categories.model";
import { VendorsModel } from "./vendors.model";

@Table({
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName:"Products"
})

export class ProductModel extends Model {

    @Column({
        type:DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        
    })
    product_id!:number

    @Column({
        type:DataType.STRING,
        allowNull:false,
        
    })
    product_name!:string


    @Column({
        type:DataType.TEXT,
        allowNull:false
    })
    description!:string

    @Column({
        type:DataType.FLOAT,
        allowNull:false
    })
    price!:number

    @Column({
        type:DataType.FLOAT,
        allowNull:false
    })
    cost!:number

     @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    })
    sku!:string

    @Column({
        type:DataType.BOOLEAN,
        allowNull:false
    })
    status_product!:boolean



    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    category_name!: string;

    @ForeignKey(() => CategoriesModel)
    @Column
    category_id!: number;

    @BelongsTo(() => CategoriesModel)
    category!: CategoriesModel;

    @ForeignKey(() => VendorsModel)
    @Column
    company_id!: number;

    @BelongsTo(() => VendorsModel)
    company!: VendorsModel;



}