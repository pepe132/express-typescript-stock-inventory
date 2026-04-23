import { Table,Model,Column,DataType, HasMany} from "sequelize-typescript";
import { UsersModel } from "./users.model";

@Table({
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName:"Companies"
})

export class VendorsModel extends Model {

    @Column({
        type:DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    company_id!:number

    @Column({
        type:DataType.STRING,
        allowNull:false,
        
    })
    company_name!:string

    @HasMany(() => UsersModel)
    users!: UsersModel[];

}