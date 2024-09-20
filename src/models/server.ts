import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import connectionDB from "../config/connection";
import ProductRoutes from "../routes/product.routes";
import CategoryRoutes from "../routes/category.routes";
import { paths } from "../interfaces/paths.interface";
import RolesRoutes from "../routes/roles.routes";
import VendorsRoutes from "../routes/vendor.routes";
import UserRoutes from "../routes/user.routes";

export class Server{

    public app: Application;
    public port: string | number ;
    private paths: paths;

    constructor(){
        this.app=express();
        this.port=process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
        this.paths={
            
            products:'/api/products',
            categories:'/api/categories',
            roles:'/api/roles',
            vendors:'/api/vendors',
            users:'/api/users'

        }
        this.dbConnection()
        this.middlewares();
        
        this.routes()
    }

    async dbConnection(){
        try {
            await connectionDB();
            
        } catch (error) {
            console.log(error);
            
        }
    }

    middlewares(){
      
        this.app.use(cors());

        this.app.use(express.json());

    }

    routes(){
        
        this.app.use(this.paths.products,ProductRoutes)
        this.app.use(this.paths.categories,CategoryRoutes)
        this.app.use(this.paths.roles,RolesRoutes)
        this.app.use(this.paths.vendors,VendorsRoutes)
        this.app.use(this.paths.users,UserRoutes)

    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
}
