import axios from "axios"

//creating an axios instance
const instance = axios.create({
    baseURL : "http://localhost:5000/api"
})

export default instance;