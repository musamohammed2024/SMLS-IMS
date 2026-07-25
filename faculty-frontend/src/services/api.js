import axios from "axios";
import { getToken } from "../utils/auth";


// Create Axios instance
const API = axios.create({

  // Uses environment variable
 // API: ${import.meta.env.VITE_API_URL}
  // Production: Render backend URL
  baseURL: import.meta.env.VITE_API_URL,

});


// Automatically attach JWT token to every request
API.interceptors.request.use(

  (config) => {

    const token = getToken();

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  },


  (error) => {

    return Promise.reject(error);

  }

);


// Handle common response errors
API.interceptors.response.use(

  (response) => {

    return response;

  },


  (error) => {

    if (error.response?.status === 401) {

      console.log("Unauthorized request");

      // Optional:
      // localStorage.removeItem("token");

    }


    return Promise.reject(error);

  }

);


export default API;