import axios from "axios";

export const axiosInstance = axios.create({
    baseURL:"https://expressbackfore-production.up.railway.app/",
    withCredentials: true
});