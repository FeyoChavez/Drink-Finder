import axios from 'axios'

// simplificado de la api
const api = axios.create({
    baseURL : 'https://www.thecocktaildb.com/api/json/v1/1'
})

export default api