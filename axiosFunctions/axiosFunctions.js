import axios from "axios"

export default class AxiosFunctions{

    getProducts(){

            return axios.get('https://dummyjson.com/products')

    }

    getFilteredProduct(id){

        return axios.get(`https://dummyjson.com/products/${id}`)
    }


}