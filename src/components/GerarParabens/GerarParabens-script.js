const axios = require('axios')

export default class GerarParabensScript {
    constructor() {
        this.apiUrl="http://localhost:8000/api"
    }
    getFrase(nome, categoria){
        const payload = {"name":nome, "category":categoria};
        return axios.post(`${this.apiUrl}/generate_message`, payload);
    }

    getCategorias(){
        return axios.get(`${this.apiUrl}/categorias`);
    }
}