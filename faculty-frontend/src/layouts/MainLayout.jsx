import React, { useState } from "react";
import { getUser } from "../utils/auth";

import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";


export default function MainLayout({ children }) {

  const [mobileOpen, setMobileOpen] = useState(false);

  const currentUser = getUser();


  return (

    <div style={styles.layout}>


      {/* Mobile Menu Button */}
      <button
        style={styles.mobileButton}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        ☰
      </button>



      {/* Sidebar */}

      <div
        style={{
          ...styles.sidebarWrapper,
          ...(mobileOpen ? styles.mobileSidebar : {})
        }}
      >

        <Sidebar />

      </div>





      {/* Main Area */}

      <div style={styles.main}>


        <header style={styles.header}>


          <div>

            <h2 style={styles.title}>
              SMLS Information Management System
            </h2>


            <p style={styles.subtitle}>
              Faculty Management Portal
            </p>

          </div>



          <div style={styles.profile}>

  👤 {currentUser?.name || "User"}

  <br />

  <small>
    {currentUser?.role || ""}
  </small>

</div>


        </header>





        <main style={styles.content}>

          {children}

        </main>





        <Footer/>


      </div>


    </div>

  );

}




const styles = {


layout: {

  display:"flex",

  minHeight:"100vh",

  background:"#f1f5f9"

},



sidebarWrapper: {

  width:"260px",

},



mobileSidebar: {

  display:"block",

  position:"fixed",

  top:0,

  left:0,

  height:"100vh",

  zIndex:999

},




main: {

  flex:1,

  display:"flex",

  flexDirection:"column",

},





header: {

  background:"#ffffff",

  padding:"20px 35px",

  display:"flex",

  justifyContent:"space-between",

  alignItems:"center",

  borderBottom:"1px solid #e2e8f0",

  boxShadow:"0 4px 12px rgba(0,0,0,0.05)"

},




title: {

  margin:0,

  color:"#0f172a",

  fontSize:"24px",

  fontWeight:"700"

},



subtitle: {

  marginTop:"5px",

  marginBottom:0,

  color:"#64748b",

  fontSize:"14px"

},





content: {

  padding:"30px",

  flex:1

},





profile: {

  background:"#dbeafe",

  color:"#1e40af",

  padding:"10px 20px",

  borderRadius:"30px",

  fontWeight:"600",

},





mobileButton: {

  display:"none",

  position:"fixed",

  top:"15px",

  left:"15px",

  zIndex:1000,

  fontSize:"22px",

  border:"none",

  background:"#2563eb",

  color:"#ffffff",

  borderRadius:"10px",

  padding:"8px 14px",

  cursor:"pointer"

}


};