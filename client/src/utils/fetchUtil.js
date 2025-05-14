import axios from "axios";

const fetchData = axios.create({
  baseURL: VITE_API_URL, 
  withCredentials: true, 
});

export default fetchData;
