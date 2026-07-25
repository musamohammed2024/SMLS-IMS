import React from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1 style={styles.logo}>
          SMLS
        </h1>

        <h2 style={styles.title}>
          Account Registration
        </h2>

        <p style={styles.message}>
          Public registration is not available for this system.
        </p>

        <p style={styles.description}>
          If you need access to the Staff Management and Logistics System (SMLS),
          please contact the System Administrator. User accounts are created and
          managed by the administrator to ensure system security.
        </p>

        <button
          style={styles.button}
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>

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
    background: "linear-gradient(135deg,#0f172a,#2563eb)",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },

  card: {
    width: "450px",
    maxWidth: "100%",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
    textAlign: "center",
  },

  logo: {
    color: "#2563eb",
    fontSize: "42px",
    margin: 0,
  },

  title: {
    color: "#0f172a",
    marginTop: "15px",
    marginBottom: "20px",
  },

  message: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#dc2626",
    marginBottom: "15px",
  },

  description: {
    color: "#475569",
    lineHeight: "1.7",
    marginBottom: "30px",
  },

  button: {
    width: "100%",
    padding: "13px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};