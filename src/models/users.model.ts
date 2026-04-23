import { Table,Model,Column,DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import { RolesModel } from "./role.model";
import { VendorsModel } from "./vendors.model";

@Table({
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName:"Users"
})

export class UsersModel extends Model {

    @Column({
        type:DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    user_id!:number

    @Column({
        type:DataType.STRING,
        allowNull:false,
        
    })
    user_name!:string

    @Column({
        type:DataType.STRING,
        allowNull:false,
        
    })
    user_password!:string

    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique: true
        
    })
    email!:string
    
    @ForeignKey(() => RolesModel)
  
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
        
    })
    role_id!: number

    @BelongsTo(() => RolesModel)
    role!: RolesModel;

    @ForeignKey(() => VendorsModel)
    @Column
    company_id!: number;

    @BelongsTo(() => VendorsModel)
    company!: VendorsModel;



}