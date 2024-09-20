import { Table,Model,Column,DataType, ForeignKey, BelongsTo} from "sequelize-typescript";
import { RolesModel } from "./role.model";

@Table({
    timestamps:false,
    tableName:"Users"
})

export class UsersModel extends Model {

    @Column({
        type:DataType.STRING,
        primaryKey: true,
        allowNull:false
    })
    user_id!:string

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
    
    @ForeignKey(() => RolesModel)
  
    @Column({
        type:DataType.NUMBER,
        allowNull:false,
        
    })
    role_id!: number

    @BelongsTo(() => RolesModel)
    role!: RolesModel;

    @Column({
        type:DataType.STRING,
        allowNull:false,
        
    })
    email!:string


}