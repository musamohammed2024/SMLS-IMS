import axios from "axios";
import { getToken } from "../utils/auth";



const API = axios.create({

  baseURL: `${import.meta.env.VITE_API_URL}/stats`,

});





const authHeaders = () => ({

  headers:{

    Authorization:
      `Bearer ${getToken()}`

  }

});






export const getDashboardStats = async()=>{


  const response =
    await API.get(
      "/",
      authHeaders()
    );


  return response.data;


};