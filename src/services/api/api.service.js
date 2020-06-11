import axios from "axios";

class api {

    constructor() {
        this.request = axios.create({
            baseURL: 'http://172.21.0.1:8098/',
            timeout: 1000,
            headers: {
                'Access-Control-Allow-Origin': '172.25.0.1',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    getToken() {
        this.request.get('api/access_token/?email=libisV2@phooto.com.br&password=Yhyc7cd-Ty7hcfcR')
            .then(res => {
                console.log(res.data);
            }).catch(err => {
            console.log(err.data);
        });
    }

}

export default api;
