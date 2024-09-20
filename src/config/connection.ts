import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../models/products.model";
import { CategoriesModel } from "../models/categories.model";
import { RolesModel } from "../models/role.model";
import { VendorsModel } from "../models/vendors.model";
import { UsersModel } from "../models/users.model";


const sequelize = new Sequelize('Prueba','sa','Joseelzully3#',{
    dialect: 'mssql',
    host: "JOSEG",
    port:1433,
    dialectOptions: {
      options: {
        // Configura la autenticación de Windows
        trustedConnection: true,
        encrypt: false, // Utiliza encryption si es necesario
      },
    },
    models:[
        ProductModel,
        CategoriesModel,
        RolesModel,
        VendorsModel,
        UsersModel
    ]
  });

async function connectionDB() {
    sequelize.authenticate()
    .then(() => {
      console.log('Conexión establecida correctamente.');
    })
    .catch(err => {
      console.error('No se pudo conectar a la base de datos:', err);
    });

}

export default connectionDB;