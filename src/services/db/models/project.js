export class Project{
   
    constructor(template){

        if(typeof template != "undefined"){
            Object.assign(this, template);
        }
       
    }
    
}

