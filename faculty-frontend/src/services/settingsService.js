 import axios from "axios";
import { getToken } from "../utils/auth";


// ===============================
// SETTINGS API CONNECTION
// ===============================

const API = axios.create({

  baseURL: "http://localhost:5000/api/settings",

});




// ===============================
// ADD JWT TOKEN AUTOMATICALLY
// ===============================

API.interceptors.request.use((config)=>{


  const token = getToken();


  if(token){

    config.headers.Authorization =
      `Bearer ${token}`;

  }


  return config;


});




// ===============================
// GET USER SETTINGS
// ===============================

export const getSettings = async(userId)=>{


  const response = await API.get(

    `/${userId}`

  );


  return response.data;


};





// ===============================
// UPDATE PROFILE
// ===============================

export const updateProfile = async(

  userId,

  profileData

)=>{


  const response = await API.put(

    `/profile/${userId}`,

    profileData

  );


  return response.data;


};





// ===============================
// UPDATE PREFERENCES
// ===============================

export const updatePreferences = async(

  userId,

  preferenceData

)=>{


  const response = await API.put(

    `/preferences/${userId}`,

    preferenceData

  );


  return response.data;


};