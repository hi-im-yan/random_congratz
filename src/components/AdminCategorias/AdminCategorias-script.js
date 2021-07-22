const axios = require('axios')

export default class AdminCategoriasScript {
    constructor() {
        this.apiUrl="http://localhost:8000/api"
    }

    getCategorias(){
        return axios.get(`${this.apiUrl}/categorias`);
    }
}