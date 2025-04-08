import axios from "axios";
import  dotenv from "dotenv";

dotenv.config();

const VITE_API_URL = process.env.VITE_API_URL ;

const fetchData = axios.create({
    baseURL : VITE_API_URL+'/api',
    withCredentials: true,
})

export default fetchData;