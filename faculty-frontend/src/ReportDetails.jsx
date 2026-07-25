import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { isAuthenticated } from "../utils/auth";

const ReportDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ================= AUTH CHECK =================
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
      return;
    }

    // ================= MOCK DATA (replace with API later) =================
    const mockReports = [
      {
        id: "1",
        title: "Faculty Attendance Report",
        type: "Attendance",
        date: "2026-07-01",
        content:
          "This report shows attendance records of all faculty members across departments.",
      },
      {
        id: "2",
        title: "Department Performance Report",
        type: "Performance",
        date: "2026-06-28",
        content:
          "This report evaluates departmental performance based on KPIs and student outcomes.",
      },
      {
        id: "3",
        title: "User Activity Summary",
        type: "System",
        date: "2026-06-25",
        content:
          "This report summarizes system usage, logins, and user interactions.",
      },
    ];

    const found = mockReports.find((r) => r.id === id);

    setReport(found || null);
    setLoading(false);
  }, [id, navigate]);

  // ================= LOADING =================
  if (loading) {
    return (
      <div style={styles.center}>
        <h3>Loading report...</h3>
      </div>
    );
  }

  // ================= NOT FOUND =================
  if (!report) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2>Report not found</h2>
          <button onClick={() => navigate("/reports")} style={styles.backBtn}>
            Back to Reports
          </button>
        </div>
      </div>
    );
  }

  // ================= MAIN UI =================
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Report Details</h2>

        <button onClick={() => navigate("/reports")} style={styles.backBtn}>
          ← Back
        </button>
      </div>

      <div style={styles.card}>
        <h3 style={styles.title}>{report.title}</h3>

        <div style={styles.metaBox}>
          <p style={styles.meta}>
            <strong>Type:</strong> {report.type}
          </p>

          <p style={styles.meta}>
            <strong>Date:</strong> {report.date}
          </p>
        </div>

        <hr style={styles.hr} />

        <p style={styles.content}>{report.content}</p>
      </div>
    </div>
  );
};

export default ReportDetails;

/* ================= STYLES (UPDATED DESIGN SYSTEM) ================= */

const styles = {
  container: {
    padding: "24px",
    background: "#f4f6f8",
    minHeight: "100%",
  },

  center: {
    height: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#64748b",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },

  card: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "22px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
    border: "1px solid #e2e8f0",
  },

  title: {
    marginBottom: "12px",
    color: "#1e293b",
  },

  metaBox: {
    display: "flex",
    gap: "20px",
    marginBottom: "10px",
  },

  meta: {
    color: "#64748b",
    fontSize: "14px",
  },

  content: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#334155",
  },

  hr: {
    margin: "15px 0",
    border: "none",
    borderTop: "1px solid #e2e8f0",
  },

  backBtn: {
    padding: "8px 14px",
    background: "#1e293b",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.2s",
  },
};