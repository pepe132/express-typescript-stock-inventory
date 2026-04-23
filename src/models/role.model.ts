import { Table,Model,Column,DataType, HasMany} from "sequelize-typescript";
import { UsersModel } from "./users.model";

@Table({
    timestamps: true,
    paranoid: true,
    tableName:"Roles"
})

export class RolesModel extends Model {

    @Column({
        type:DataType.INTEGER,
        primaryKey: true,
        autoIncrement:true
    })
    role_id!:number

    @Column({
        type:DataType.STRING,
        allowNull:false,
        
    })
    role_name!:string

    @HasMany(() => UsersModel)
    users!: UsersModel[];

}