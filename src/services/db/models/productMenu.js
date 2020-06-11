export class ProductMenu{
   
    constructor(product_menu_json){

        if(typeof product_menu_json != "undefined"){
            Object.assign(this, product_menu_json);
        }
    }
    
}

