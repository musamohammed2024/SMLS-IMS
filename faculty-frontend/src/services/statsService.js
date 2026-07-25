import axios from "axios";
import { getToken } from "../utils/auth";



const API = axios.create({

  baseURL:"http://localhost:5000/api/stats"

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