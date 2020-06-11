export class Product{
   
    constructor(product_json, project_template){

        if(typeof product_json != "undefined"){
            Object.assign(this, product_json);
        }


        if(typeof project_template != "undefined"){
            this.project_template = project_template;
        }

       
    }
    
}

