import Dexie from 'dexie';

import {Project} from './models/project';
import {Product} from './models/product';
import {ProductMenu} from './models/productMenu';
import {ImageUpload} from './models/imageUpload';

export class AppDatabase extends Dexie {    
   
    constructor() {

        super("LeCherut3");

        // Define tables and indexes
        this.version(1).stores({
            projects: '++id, active, uuid, status',
            products: '++id, external_product_id,  uuid,status, project_template',
            product_menus: '++id, external_product_id, icon, title, subtitle, action ',
            images_upload: 'uuid, project_uuid, uuid, uploaded'

        });
       
        //this.projects.mapToClass(Project);
        //this.products.mapToClass(Product);
        //this.product_menus.mapToClass(ProductMenu);
        
        //this.images_upload.mapToClass(ImageUpload);
    }
}
let db = new AppDatabase();

export default db;
