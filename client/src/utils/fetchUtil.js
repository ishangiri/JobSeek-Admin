import axios from "axios";

const fetchData = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  withCredentials: true, 
});

export default fetchData;
