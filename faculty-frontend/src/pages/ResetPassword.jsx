import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          password,
        }
      );

      alert("Password reset successfully.");

      navigate("/login");

    } catch (err) {

      setMessage(
        err.response?.data?.message ||
        "Password reset failed."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.logo}>
          SMLS
        </h1>

        <h2 style={styles.title}>
          Reset Password
        </h2>

        <p style={styles.subtitle}>
          Enter your new password below.
        </p>

        {message && (
          <div style={styles.error}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* New Password */}

          <div style={styles.passwordBox}>

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="New Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              style={styles.passwordInput}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              style={styles.eyeButton}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

          </div>

          {/* Confirm Password */}

          <div
            style={{
              ...styles.passwordBox,
              marginTop: "15px"
            }}
          >

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
              style={styles.passwordInput}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              style={styles.eyeButton}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>

          </div>

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {
              loading
                ? "Updating..."
                : "Reset Password"
            }
          </button>

        </form>

      </div>

    </div>
  );
}

const styles = {

  container: {

    minHeight: "100vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    background:
      "linear-gradient(135deg,#0f172a,#2563eb)",

    fontFamily: "Arial, sans-serif",

    padding: "20px",

  },

  card: {

    width: "420px",

    maxWidth: "100%",

    background: "#ffffff",

    padding: "40px",

    borderRadius: "18px",

    boxShadow:
      "0 15px 35px rgba(0,0,0,.25)",

  },

  logo: {

    textAlign: "center",

    color: "#2563eb",

    fontSize: "42px",

    margin: 0,

  },

  title: {

    textAlign: "center",

    marginTop: "10px",

    color: "#0f172a",

  },

  subtitle: {

    textAlign: "center",

    color: "#64748b",

    marginBottom: "25px",

  },

  passwordBox: {

    display: "flex",

    alignItems: "center",

    border:
      "1px solid #cbd5e1",

    borderRadius: "10px",

    overflow: "hidden",

  },

  passwordInput: {

    flex: 1,

    padding: "13px",

    border: "none",

    outline: "none",

    fontSize: "15px",

  },

  eyeButton: {

    border: "none",

    background: "#ffffff",

    cursor: "pointer",

    padding: "12px",

    fontSize: "18px",

  },

  button: {

    width: "100%",

    marginTop: "25px",

    padding: "13px",

    background: "#2563eb",

    color: "#ffffff",

    border: "none",

    borderRadius: "10px",

    fontSize: "16px",

    fontWeight: "bold",

    cursor: "pointer",

  },

  error: {

    background: "#fee2e2",

    color: "#b91c1c",

    padding: "10px",

    borderRadius: "8px",

    marginBottom: "20px",

    textAlign: "center",

  },

};