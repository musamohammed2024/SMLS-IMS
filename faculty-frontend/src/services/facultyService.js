import axios from "axios";

import { getToken } from "../utils/auth";


const API =
"http://localhost:5000/api/faculty";




// ===============================
// AUTH HEADER
// ===============================

const getAuthHeaders = () => {


  const token = getToken();



  return {

    headers: {

      Authorization: `Bearer ${token}`

    }

  };


};







// ===============================
// GET ALL FACULTY
// ===============================

export const getFaculty = async()=>{


  const res = await axios.get(

    API,

    getAuthHeaders()

  );


  console.log("Faculty data from backend:", res.data);


  return res.data;


};







// ===============================
// CREATE FACULTY
// ADMIN ONLY
// ===============================

export const createFaculty = async(data)=>{


  const res = await axios.post(

    API,

    data,

    {

      headers: {

        ...getAuthHeaders().headers,

        "Content-Type":
        "multipart/form-data"

      }

    }

  );


  return res.data;


};








// ===============================
// UPDATE FACULTY
// ADMIN ONLY
// ===============================

export const updateFaculty = async(id,data)=>{


  const res = await axios.put(

    `${API}/${id}`,

    data,

    {

      headers: {

        ...getAuthHeaders().headers,

        "Content-Type":
        "multipart/form-data"

      }

    }

  );


  return res.data;


};








// ===============================
// DELETE FACULTY
// ADMIN ONLY
// ===============================

export const deleteFaculty = async(id)=>{


  const res = await axios.delete(

    `${API}/${id}`,

    getAuthHeaders()

  );


  return res.data;


};

// ===============================
// GET FACULTY BY ID
// ===============================

export const getFacultyById = async (id) => {

  const res = await axios.get(

    `${API}/${id}`,

    getAuthHeaders()

  );

  return res.data;

};