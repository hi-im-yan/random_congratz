const axios = require('axios')

export default class AdminParabensScript {
    constructor() {
        this.apiUrl="http://localhost:8000/api"
    }

    getMensagens(){
        return axios.get(`${this.apiUrl}/mensagens`)
    }
    getCategorias(){
        return axios.get(`${this.apiUrl}/categorias`);
    }
}