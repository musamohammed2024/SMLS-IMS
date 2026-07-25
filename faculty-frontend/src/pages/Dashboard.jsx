import React, { useEffect, useState } from "react";

import { getDashboardStats } from "../services/statsService";

import DashboardCharts from "../components/DashboardCharts";

import { getUser } from "../utils/auth";


export default function Dashboard() {


  const user = getUser();


  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");



  const roleNames = {

    admin: "Administrator",

    staff: "Staff",

    viewer: "Viewer",

  };



  const displayRole = (role) => {

    return roleNames[role] || "Unknown";

  };



  useEffect(() => {

    loadDashboard();

  }, []);




  const loadDashboard = async () => {


    try {


      const data = await getDashboardStats();


      setStats(data);



    } catch (err) {


      console.error("Dashboard error:", err);


      setError("Unable to load dashboard data");



    } finally {


      setLoading(false);


    }


  };




  if (loading) {


    return (

      <div style={styles.loading}>

        Loading Dashboard...

      </div>

    );

  }





  if (error) {


    return (

      <div style={styles.error}>

        {error}

      </div>

    );

  }




  return (

    <div style={styles.container}>


      {/* HEADER */}

      <div style={styles.hero}>


        <div>


          <h1 style={styles.title}>

            Welcome, {user?.name} 👋

          </h1>



          <p style={styles.subtitle}>

            SMLS Information Management System Dashboard

          </p>


        </div>



        <div style={styles.roleBadge}>

          {displayRole(user?.role)}

        </div>


      </div>

            {/* SUMMARY CARDS */}

      <div style={styles.cards}>


        <Card

          title="Faculty"

          value={stats.faculty}

          icon="👨‍🏫"

          gradient="linear-gradient(135deg,#667eea,#764ba2)"

        />



        <Card

          title="Users"

          value={stats.users}

          icon="👥"

          gradient="linear-gradient(135deg,#11998e,#38ef7d)"

        />



        <Card

          title="Publications"

          value={stats.totalPublications}

          icon="📚"

          gradient="linear-gradient(135deg,#ff9966,#ff5e62)"

        />



        <Card

          title="Active Faculty"

          value={stats.activeFaculty}

          icon="✅"

          gradient="linear-gradient(135deg,#396afc,#2948ff)"

        />


      </div>





      {/* ANALYTICS SECTION */}


      <div style={styles.analytics}>


        <h2 style={styles.sectionTitle}>

          📈 Analytics Overview

        </h2>



        <DashboardCharts stats={stats} />


      </div>



    </div>

  );

}





// =====================================
// CARD COMPONENT
// =====================================


function Card({ title, value, icon, gradient }) {


  return (

    <div

      style={{

        ...styles.card,

        background: gradient,

      }}

    >


      <div style={styles.icon}>

        {icon}

      </div>



      <div>


        <h3 style={styles.cardTitle}>

          {title}

        </h3>



        <h1 style={styles.cardValue}>

          {value}

        </h1>


      </div>



    </div>

  );


}

const styles = {


  container: {

    width: "100%",

  },



  hero: {

    background: "linear-gradient(135deg,#667eea,#764ba2)",

    color: "white",

    padding: "30px",

    borderRadius: "18px",

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: "30px",

    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",

  },



  title: {

    margin:0,

    fontSize:"32px",

    fontWeight:"700",

  },



  subtitle: {

    marginTop:"10px",

    opacity:0.9,

    fontSize:"16px",

  },



  roleBadge: {

    background:"rgba(255,255,255,0.25)",

    padding:"12px 22px",

    borderRadius:"30px",

    fontWeight:"bold",

    backdropFilter:"blur(10px)",

  },





  cards: {


    display:"grid",

    gridTemplateColumns:

      "repeat(auto-fit,minmax(230px,1fr))",


    gap:"25px",


    marginBottom:"35px",


  },





  card: {


    color:"white",

    padding:"25px",


    borderRadius:"18px",


    display:"flex",

    alignItems:"center",


    gap:"20px",


    boxShadow:"0 12px 25px rgba(0,0,0,0.15)",


    transition:"0.3s",


    cursor:"pointer",


  },





  icon:{


    fontSize:"45px",


    background:"rgba(255,255,255,0.2)",


    width:"70px",


    height:"70px",


    display:"flex",


    alignItems:"center",


    justifyContent:"center",


    borderRadius:"50%",


  },





  cardTitle:{


    margin:0,


    fontSize:"16px",


    opacity:0.9,


  },





  cardValue:{


    margin:"8px 0 0",


    fontSize:"35px",


  },






  analytics:{


    background:"#ffffff",


    padding:"30px",


    borderRadius:"18px",


    boxShadow:"0 8px 20px rgba(0,0,0,0.08)",


  },





  sectionTitle:{


    marginTop:0,


    color:"#0f172a",


    marginBottom:"25px",


  },







  loading:{


    height:"70vh",


    display:"flex",


    justifyContent:"center",


    alignItems:"center",


    fontSize:"24px",


    fontWeight:"bold",


    color:"#2563eb",


  },





  error:{


    padding:"20px",


    background:"#fee2e2",


    color:"#991b1b",


    borderRadius:"12px",


    fontWeight:"bold",


  },


};