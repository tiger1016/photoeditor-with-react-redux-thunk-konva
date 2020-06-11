import db from '../db';
import product_schema from "../../../jsons/schemas/product.json";
import {BaseAPI} from './baseAPI';
import {Product} from './product';
import {ProductMenu} from './productMenu';
import {v4 as uuidv4} from 'uuid';


export class ProductAPI extends BaseAPI{
   

    constructor(){        
        super(product_schema);        
    }

    async listActive(){
        return await db.products.where("status").equals(1);
    }

    async listMenuProduct(external_product_id){
        return await db.product_menus.where("external_product_id").equals(external_product_id);
    }           

    async new(product_json, project_template){
        let product = new Product(product_json, project_template);
                
        this.initTemplateUUIDs(product);
        console.log(product);


        await this.isValid(product);

        let productId = await db.products.add(product);
        product = await this.get(productId); 

        return product;
    }


    async newMenu(product_menu_json){
        let product_menu = new ProductMenu(product_menu_json);                

        let productMenuId = await db.product_menus.add(product_menu);
        product_menu = await this.get(productMenuId); 

        return product_menu;
    }


    async get(productId){
        let product = await db.products.get(productId);

        return product;
    }

    async save(product){

        await this.isValid(product);
        await db.products.update(product.id,product);
        
        return true;
    }
    

    initTemplateUUIDs(product){

        product.uuid = uuidv4();
        
    } 

}

