 import { getUserRole } from "./auth";


// ===============================
// GET CURRENT ROLE
// ===============================

export const currentRole = () => {

  return getUserRole();

};




// ===============================
// ADMIN CHECK
// ===============================

export const isAdmin = () => {

  return getUserRole() === "admin";

};




// ===============================
// STAFF CHECK
// ===============================

export const isStaff = () => {

  return getUserRole() === "staff";

};




// ===============================
// VIEWER CHECK
// ===============================

export const isViewer = () => {

  return getUserRole() === "viewer";

};




// ===============================
// FACULTY PERMISSION
// ===============================

export const canManageFaculty = () => {


  const role = getUserRole();


  return (

    role === "admin" ||

    role === "staff"

  );


};




// ===============================
// USER MANAGEMENT PERMISSION
// ===============================

export const canManageUsers = () => {


  return getUserRole() === "admin";


};




// ===============================
// SETTINGS PERMISSION
// ===============================

export const canManageSettings = () => {


  return getUserRole() === "admin";


};




// ===============================
// REPORT ACCESS
// ===============================

export const canViewReports = () => {


  const role = getUserRole();


  return (

    role === "admin" ||

    role === "staff"

  );


};