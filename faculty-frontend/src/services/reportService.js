 import axios from "axios";
import { getToken } from "../utils/auth";


const API = axios.create({

  baseURL: "http://localhost:5000/api/reports",

});



// ======================================
// AUTH HEADERS
// ======================================

const getAuthHeaders = () => {

  return {

    headers: {

      Authorization:
      `Bearer ${getToken()}`,

    },

  };

};




// ======================================
// GET REPORT SUMMARY
// ======================================

export const getReportSummary = async () => {

  const res = await API.get(

    "/summary",

    getAuthHeaders()

  );


  return res.data;

};




// ======================================
// GET FULL STATISTICS
// ======================================

export const getStatisticsReport = async () => {


  const res = await axios.get(

    "http://localhost:5000/api/stats",

    getAuthHeaders()

  );


  return res.data;

};