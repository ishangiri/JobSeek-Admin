import axios from "axios";

const fetchData = axios.create({
    baseURL : '/api'
})

export default fetchData;