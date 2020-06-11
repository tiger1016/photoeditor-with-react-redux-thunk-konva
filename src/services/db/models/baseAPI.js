import Ajv from 'ajv';

export class BaseAPI{

    constructor(schema){
        this.ajv = new Ajv();
        this.validate = this.ajv.compile(schema);
    }
    
    async isValid(json_data){
        
        var valid = this.validate(json_data);

        if (!valid) throw this.validate.errors;

        return valid;
    
    }

}