import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../utils/auth";
import { loginUser } from "../services/authService";


export default function Login() {

  const navigate = useNavigate();


  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");



  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");


    if (!email || !password) {

      setError("Please enter your email and password.");

      return;

    }



    try {

      setLoading(true);


      const result = await loginUser(
        email,
        password
      );


      login(
        result.user,
        result.token
      );


      navigate(
        "/dashboard",
        {
          replace:true
        }
      );


    } catch(err) {


      console.error(err);


      setError(
        err.response?.data?.message ||
        "Invalid email or password."
      );


    } finally {


      setLoading(false);


    }

  };




  return (

    <div style={styles.container}>


      <div style={styles.card}>


        {/* HAWASSA UNIVERSITY LOGO */}

        <img
          src="/hu-logo.png"
          alt="Hawassa University Logo"
          style={styles.universityLogo}
        />



        <h1 style={styles.systemLogo}>
          SMLS
        </h1>



        <h2 style={styles.title}>
          Information Management System
        </h2>



        <p style={styles.subtitle}>
          Login to continue
        </p>




        <form
          onSubmit={handleLogin}
          style={styles.form}
        >



          <input

            type="email"

            placeholder="Email Address"

            value={email}

            onChange={(e)=>
              setEmail(e.target.value)
            }

            style={styles.input}

            required

          />





          <div style={styles.passwordBox}>


            <input

              type={
                showPassword
                ? "text"
                : "password"
              }


              placeholder="Password"


              value={password}


              onChange={(e)=>
                setPassword(e.target.value)
              }


              style={styles.passwordInput}


              required

            />



            <button

              type="button"

              onClick={() =>
                setShowPassword(!showPassword)
              }

              style={styles.eyeButton}

            >

              {
                showPassword
                ? "🙈"
                : "👁️"
              }

            </button>


          </div>





          {
            error &&

            <div style={styles.error}>

              {error}

            </div>

          }






          <button

            type="submit"

            disabled={loading}

            style={styles.button}

          >

            {
              loading
              ? "Logging in..."
              : "Login"
            }

          </button>

          <p style={{ marginTop: "15px", textAlign: "center" }}>
  <Link to="/forgot-password">
    Forgot Password?
  </Link>
</p>





        </form>






        <p style={styles.registerText}>

          Don't have an account?

          {" "}


          <button

            type="button"

            onClick={() =>
              navigate("/register")
            }


            style={styles.registerButton}

          >

            Register

          </button>


        </p>




      </div>


    </div>

  );

}





const styles = {


container: {

  minHeight:"100vh",

  display:"flex",

  justifyContent:"center",

  alignItems:"center",

  background:
    "linear-gradient(135deg,#0f172a,#2563eb)",

  fontFamily:
    "Arial, sans-serif",

  padding:"20px",

},





card: {

  width:"420px",

  maxWidth:"100%",

  background:"#ffffff",

  padding:"40px",

  borderRadius:"18px",

  boxShadow:
    "0 15px 35px rgba(0,0,0,0.25)",

  boxSizing:"border-box",

},





/* UNIVERSITY LOGO */

universityLogo: {

  width:"120px",

  height:"120px",

  objectFit:"contain",

  display:"block",

  margin:"0 auto 15px",

},





/* SMLS TITLE */

systemLogo: {

  textAlign:"center",

  margin:0,

  color:"#2563eb",

  fontSize:"40px",

},





title: {

  textAlign:"center",

  color:"#0f172a",

  marginTop:"10px",

  fontSize:"22px",

},





subtitle: {

  textAlign:"center",

  color:"#64748b",

  marginBottom:"25px",

},





form: {

  display:"flex",

  flexDirection:"column",

  gap:"15px",

},





input: {

  padding:"13px",

  border:
    "1px solid #cbd5e1",

  borderRadius:"10px",

  fontSize:"15px",

  outline:"none",

},





passwordBox: {

  display:"flex",

  alignItems:"center",

  border:
    "1px solid #cbd5e1",

  borderRadius:"10px",

  overflow:"hidden",

},





passwordInput: {

  flex:1,

  padding:"13px",

  border:"none",

  outline:"none",

  fontSize:"15px",

},





eyeButton: {

  border:"none",

  background:"#fff",

  cursor:"pointer",

  padding:"12px",

  fontSize:"18px",

},





button: {

  padding:"13px",

  background:"#2563eb",

  color:"#ffffff",

  border:"none",

  borderRadius:"10px",

  fontSize:"16px",

  fontWeight:"bold",

  cursor:"pointer",

},





error: {

  background:"#fee2e2",

  color:"#b91c1c",

  padding:"10px",

  borderRadius:"8px",

  textAlign:"center",

},





registerText: {

  textAlign:"center",

  marginTop:"25px",

  color:"#64748b",

},





registerButton: {

  border:"none",

  background:"none",

  color:"#2563eb",

  fontWeight:"bold",

  cursor:"pointer",

  textDecoration:"underline",

  fontSize:"15px",

},


};