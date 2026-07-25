import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  isAuthenticated,
  logout,
  getUser
} from "../utils/auth";


import {
  getSettings,
  updateProfile,
  updatePreferences
} from "../services/settingsService";



const Settings = () => {


  const navigate = useNavigate();


  const user = getUser();



  const [loading,setLoading] = useState(true);



  const [profile,setProfile] = useState({

    fullName:"",
    email:"",

  });



  const [preferences,setPreferences] = useState({

    theme:"light",

  });





  // ============================
  // LOAD SETTINGS
  // ============================

  useEffect(()=>{


    if(!isAuthenticated()){

      navigate(
        "/login",
        {
          replace:true
        }
      );

      return;

    }



    loadSettings();


  },[]);





  const loadSettings = async()=>{


    try{


      setLoading(true);



      const data = await getSettings(

        user.id

      );



      setProfile({

        fullName:
          data.profile?.fullName || user.name || "",


        email:
          data.profile?.email || user.email || "",

      });



      setPreferences({

        theme:
          data.preferences?.theme || "light",

      });



    }
    catch(error){


      console.log(
        "Settings loading error:",
        error
      );


      alert(
        "Cannot load settings"
      );


    }
    finally{


      setLoading(false);


    }


  };
    // ============================
  // PROFILE CHANGE
  // ============================

  const handleProfileChange = (e)=>{


    const {
      name,
      value
    } = e.target;



    setProfile(prev=>({

      ...prev,

      [name]:value

    }));


  };





  // ============================
  // PREFERENCE CHANGE
  // ============================

  const handlePreferenceChange = (e)=>{


    const {
      name,
      value
    } = e.target;



    setPreferences(prev=>({

      ...prev,

      [name]:value

    }));


  };







  // ============================
  // SAVE PROFILE
  // ============================

  const saveProfile = async(e)=>{


    e.preventDefault();



    try{


      await updateProfile(

        user.id,

        profile

      );



      alert(
        "Profile updated successfully"
      );


    }
    catch(error){


      console.log(
        "Profile update error:",
        error
      );


      alert(
        "Profile update failed"
      );


    }


  };







  // ============================
  // SAVE PREFERENCES
  // ============================

  const savePreferences = async(e)=>{


    e.preventDefault();



    try{


      await updatePreferences(

        user.id,

        preferences

      );



      alert(
        "Preferences saved successfully"
      );


    }
    catch(error){


      console.log(
        "Preference update error:",
        error
      );


      alert(
        "Preference update failed"
      );


    }


  };







  // ============================
  // LOGOUT
  // ============================

  const handleLogout = ()=>{


    const confirmLogout =
      window.confirm(
        "Are you sure you want to logout?"
      );



    if(!confirmLogout)
      return;



    logout();


    navigate(
      "/login",
      {
        replace:true
      }
    );


  };





  if(loading){


    return (

      <div style={styles.container}>

        <h3>
          Loading settings...
        </h3>

      </div>

    );


  }





  return (

    <div style={styles.container}>


      <div style={styles.header}>


        <div>


          <h2 style={styles.title}>
            Settings
          </h2>


          <p style={styles.subtext}>
            Manage account and system preferences
          </p>


        </div>





        <button

          onClick={()=>navigate("/dashboard")}

          style={styles.backBtn}

        >

          ← Back

        </button>


      </div>





      {/* PROFILE CARD */}


      <div style={styles.card}>


        <h3 style={styles.cardTitle}>
          Profile Information
        </h3>



        <form

          onSubmit={saveProfile}

          style={styles.form}

        >


          <label>
            Full Name
          </label>


          <input

            type="text"

            name="fullName"

            value={profile.fullName}

            onChange={handleProfileChange}

            style={styles.input}

          />



          <label>
            Email
          </label>


          <input

            type="email"

            name="email"

            value={profile.email}

            onChange={handleProfileChange}

            style={styles.input}

          />



          <button

            type="submit"

            style={styles.saveBtn}

          >

            Save Profile

          </button>


        </form>


      </div>
            {/* PREFERENCES CARD */}

      <div style={styles.card}>


        <h3 style={styles.cardTitle}>
          System Preferences
        </h3>



        <form

          onSubmit={savePreferences}

          style={styles.form}

        >


          <label>
            Theme
          </label>



          <select

            name="theme"

            value={preferences.theme}

            onChange={handlePreferenceChange}

            style={styles.input}

          >

            <option value="light">
              Light
            </option>


            <option value="dark">
              Dark
            </option>


          </select>



          <button

            type="submit"

            style={styles.saveBtn}

          >

            Save Preferences

          </button>



        </form>


      </div>






      {/* SYSTEM ACTIONS */}


      <div style={styles.card}>


        <h3 style={styles.cardTitle}>
          System Actions
        </h3>



        <button

          onClick={handleLogout}

          style={styles.logoutBtn}

        >

          Logout

        </button>


      </div>




    </div>


  );


};



export default Settings;






// ===============================
// STYLES
// ===============================


const styles = {


  container:{

    padding:"24px",

    fontFamily:"Arial, sans-serif",

  },



  header:{

    display:"flex",

    justifyContent:"space-between",

    alignItems:"center",

    marginBottom:"20px",

  },



  title:{

    margin:0,

    color:"#0f172a",

  },



  subtext:{

    color:"#64748b",

  },



  backBtn:{

    background:"#334155",

    color:"#ffffff",

    border:"none",

    padding:"10px 15px",

    borderRadius:"8px",

    cursor:"pointer",

  },



  card:{

    background:"#ffffff",

    padding:"20px",

    marginBottom:"20px",

    borderRadius:"12px",

    border:"1px solid #e2e8f0",

    boxShadow:
      "0 4px 10px rgba(0,0,0,0.06)",

  },



  cardTitle:{

    marginBottom:"15px",

    color:"#1e293b",

  },



  form:{

    display:"grid",

    gap:"12px",

  },



  input:{

    width:"100%",

    padding:"12px",

    border:"1px solid #cbd5e1",

    borderRadius:"8px",

    fontSize:"14px",

    boxSizing:"border-box",

  },



  saveBtn:{

    background:"#2563eb",

    color:"#ffffff",

    border:"none",

    padding:"12px",

    borderRadius:"8px",

    cursor:"pointer",

    fontWeight:"bold",

  },



  logoutBtn:{

    width:"100%",

    background:"#dc2626",

    color:"#ffffff",

    border:"none",

    padding:"12px",

    borderRadius:"8px",

    cursor:"pointer",

    fontWeight:"bold",

  },


};