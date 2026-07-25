import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ReportDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [report, setReport] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
      return;
    }

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
    setReport(found);
  }, [id, navigate]);

  if (!report) {
    return (
      <div style={styles.container}>
        <div style={styles.notFoundCard}>
          <h2 style={styles.notFoundTitle}>Report not found</h2>
          <p style={styles.notFoundText}>
            The report you are looking for does not exist or has been removed.
          </p>

          <button
            onClick={() => navigate("/reports")}
            style={styles.backBtn}
          >
            Back to Reports
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.title}>Report Details</h2>

        <button
          onClick={() => navigate("/reports")}
          style={styles.backBtn}
        >
          ← Back
        </button>
      </div>

      {/* CARD */}
      <div style={styles.card}>
        <h3 style={styles.reportTitle}>{report.title}</h3>

        <div style={styles.metaBox}>
          <p style={styles.meta}>
            <strong>Type:</strong> {report.type}
          </p>

          <p style={styles.meta}>
            <strong>Date:</strong> {report.date}
          </p>
        </div>

        <hr style={styles.divider} />

        <p style={styles.content}>{report.content}</p>
      </div>
    </div>
  );
};

export default ReportDetails;

/* ================= STYLES ================= */

const styles = {
  container: {
    padding: "24px",
    fontFamily: "Arial, sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  title: {
    margin: 0,
    color: "#0f172a",
    fontSize: "22px",
  },

  backBtn: {
    padding: "10px 14px",
    background: "#334155",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  card: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "22px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    border: "1px solid #e2e8f0",
  },

  reportTitle: {
    margin: "0 0 12px",
    color: "#1e293b",
    fontSize: "20px",
  },

  metaBox: {
    marginBottom: "10px",
  },

  meta: {
    margin: "4px 0",
    color: "#475569",
    fontSize: "14px",
  },

  divider: {
    margin: "15px 0",
    border: "none",
    borderTop: "1px solid #e2e8f0",
  },

  content: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#334155",
  },

  notFoundCard: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  notFoundTitle: {
    color: "#dc2626",
    marginBottom: "10px",
  },

  notFoundText: {
    color: "#64748b",
    marginBottom: "20px",
  },
};