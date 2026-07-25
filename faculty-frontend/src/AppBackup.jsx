 import React from "react";

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";


import Dashboard from "./pages/Dashboard";
import Faculty from "./pages/Faculty";
import AddFaculty from "./pages/AddFaculty";
import EditFaculty from "./pages/EditFaculty";
import FacultyProfile from "./pages/FacultyProfile";

import Users from "./pages/Users";

import Reports from "./pages/Reports";
import ReportDetails from "./pages/ReportDetails";

import Settings from "./pages/Settings";


import MainLayout from "./layouts/MainLayout";
import Footer from "./components/Footer";


import {
  isAuthenticated,
  getUserRole
} from "./utils/auth";





// =================================
// PROTECTED ROUTE
// =================================

function ProtectedRoute({ children }) {


  if (isAuthenticated()) {


    return (

      <MainLayout>

        {children}

      </MainLayout>

    );

  }


  return (

    <Navigate

      to="/login"

      replace

    />

  );

}

// =================================
// ROLE PROTECTED ROUTE
// =================================

function RoleRoute({ children, allowedRoles }) {

  const role = getUserRole();

  console.log("CURRENT ROLE:", role);
  console.log("ALLOWED ROLES:", allowedRoles);


  if (!isAuthenticated()) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }


  if (!allowedRoles.includes(role)) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  }


  return (

    <MainLayout>

      {children}

    </MainLayout>

  );

}






// =================================
// APP
// =================================

function App() {

console.log("APP JSX LOADED");

  return (

    <Routes>


      {/* ==========================
          PUBLIC
      ========================== */}


      <Route

        path="/"

        element={

          <Navigate

            to="/login"

            replace

          />

        }

      />



      <Route

        path="/login"

        element={

          <>

            <Login />

            <Footer />

          </>

        }

      />



      <Route

        path="/register"

        element={

          <>

            <Register />

            <Footer />

          </>

        }

      />



      {/* FORGOT PASSWORD */}

      <Route

        path="/forgot-password"

        element={

          <>

            <ForgotPassword />

            <Footer />

          </>

        }

      />





      {/* ==========================
          PROTECTED
      ========================== */}



      <Route

        path="/dashboard"

        element={

          <ProtectedRoute>

            <Dashboard />

          </ProtectedRoute>

        }

      />





      <Route

        path="/faculty"

        element={

          <ProtectedRoute>

            <Faculty />

          </ProtectedRoute>

        }

      />





      <Route
 path="/faculty/add"
 element={
  <RoleRoute allowedRoles={["admin"]}>
    <AddFaculty />
  </RoleRoute>
 }
/>





      <Route

        path="/faculty/edit/:id"

        element={

         <RoleRoute allowedRoles={["admin"]}>
  <EditFaculty />
</RoleRoute>

        }

      />





      <Route

        path="/faculty/profile/:id"

        element={

          <ProtectedRoute>

            <FacultyProfile />

          </ProtectedRoute>

        }

      />





      <Route
 path="/users"
 element={
  <RoleRoute allowedRoles={["admin"]}>
    <Users />
  </RoleRoute>
 }
/>





      <Route

        path="/reports"

        element={

          <ProtectedRoute>

            <Reports />

          </ProtectedRoute>

        }

      />





      <Route

        path="/reports/:id"

        element={

          <ProtectedRoute>

            <ReportDetails />

          </ProtectedRoute>

        }

      />





      <Route

        path="/settings"

        element={

          <RoleRoute allowedRoles={["admin"]}>
  <Settings />
</RoleRoute>

        }

      />







      {/* ==========================
          NOT FOUND
      ========================== */}



      <Route

        path="*"

        element={

          <Navigate

            to="/login"

            replace

          />

        }

      />



    </Routes>

  );

}





// IMPORTANT
// DO NOT REMOVE THIS

export default App;
