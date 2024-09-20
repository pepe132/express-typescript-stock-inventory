import { Table,Model,Column,DataType} from "sequelize-typescript";

@Table({
    timestamps:false,
    tableName:"Vendors"
})

export class VendorsModel extends Model {

    @Column({
        type:DataType.STRING,
        primaryKey: true,
        allowNull:false
    })
    vendor_id!:string

    @Column({
        type:DataType.STRING,
        allowNull:false,
        
    })
    vendor_name!:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    vendor_phone!:string

    @Column({
        type:DataType.STRING,
        allowNull:false,
        
    })
    vendor_email!:string

    @Column({
        type:DataType.STRING,
        allowNull:false,
        
    })
    vendor_address!:string


}