import axios from "axios"

//creating an axios instance
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_MY_API_URL}/api`,
});

export default instance;