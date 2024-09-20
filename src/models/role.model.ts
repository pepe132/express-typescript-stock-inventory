import { Table,Model,Column,DataType} from "sequelize-typescript";

@Table({
    timestamps:false,
    tableName:"Roles"
})

export class RolesModel extends Model {

    @Column({
        type:DataType.NUMBER,
        primaryKey: true,
        allowNull:false
    })
    role_id!:number

    @Column({
        type:DataType.STRING,
        allowNull:false,
        
    })
    role_name!:string

}