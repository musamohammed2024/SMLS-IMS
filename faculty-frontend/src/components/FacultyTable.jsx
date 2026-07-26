import React, { useState } from "react";
import { hasRole } from "../utils/auth";

export default function FacultyTable({
  faculty,
  onEdit,
  onDelete,
  onView,
}) {
  
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [rank, setRank] = useState("All");

  const isAdmin = hasRole("admin");

  // ======================================
  // FILTER FACULTY
  // ======================================

  const query = search.toLowerCase();

  const filteredFaculty = (faculty || []).filter((item) => {
    const matchesSearch =
      (item.fullName || "").toLowerCase().includes(query) ||
      (item.email || "").toLowerCase().includes(query) ||
      (item.fieldOfSpecialization || "")
        .toLowerCase()
        .includes(query);

    const matchesStatus =
      status === "All" ||
      item.currentStatus === status;

    const matchesRank =
      rank === "All" ||
      item.academicRank === rank;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesRank
    );
  });


  // ======================================
  // DOWNLOAD FACULTY INFORMATION
  // ======================================

  const downloadContacts = () => {
    const headers = [
      "Title",
      "Full Name",
      "Gender",
      "Qualification",
      "Field of Specialization",
      "Academic Rank",
      "Current Position",
      "Semester Load",
      "Service Years",
      "Total Publications",
      "Telephone",
      "Email",
      "ORCID",
      "Country",
      "Current Status",
    ];

    const rows = filteredFaculty.map((f) => [
      f.title || "",
      f.fullName || "",
      f.gender || "",
      f.qualification || "",
      f.fieldOfSpecialization || "",
      f.academicRank || "",
      f.currentPosition || "",
      f.semesterLoad ?? 0,
      f.serviceYear ?? 0,
      f.totalPublications ?? 0,
      f.telephone || "",
      f.email || "",
      f.orcid || "",
      f.country || "",
      f.currentStatus || "",
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      )
      
      .join("\n");


    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "Faculty_Information.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };


  // ======================================
  // UNIQUE RANKS
  // ======================================

  const ranks = [
    ...new Set(
      (faculty || [])
        .map((item) => item.academicRank)
        .filter(Boolean)
    ),
  ];


  return (
    <div style={styles.wrapper}>

      {/* ================= TOOLBAR ================= */}

      <div style={styles.toolbar}>

        <h2 style={styles.count}>
          Faculty Members: {filteredFaculty.length}
        </h2>

        <input
          style={styles.search}
          placeholder="🔍 Search faculty..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />


        <select
          style={styles.select}
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Sabbatical Leave">
            Sabbatical Leave
          </option>
          <option value="Study Leave">
            Study Leave
          </option>
          <option value="Retired">
            Retired
          </option>
          <option value="Resigned">
            Resigned
          </option>
          <option value="Deceased">
            Deceased
          </option>
          <option value="Other">
            Other
          </option>
        </select>


        <select
          style={styles.select}
          value={rank}
          onChange={(e) =>
            setRank(e.target.value)
          }
        >
          <option value="All">
            All Ranks
          </option>

          {ranks.map((r) => (
            <option
              key={r}
              value={r}
            >
              {r}
            </option>
          ))}

        </select>


        {isAdmin && (
          <button
            style={styles.download}
            onClick={downloadContacts}
          >
            ⬇ Download Contacts
          </button>
        )}

      </div>


      {/* ================= TABLE ================= */}

      <div style={styles.container}>

        <table style={styles.table}>

          <thead>
            <tr>
              <th style={styles.th}>Photo</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Gender</th>
              <th style={styles.th}>Qualification</th>
              <th style={styles.th}>Specialization</th>
              <th style={styles.th}>Academic Rank</th>
              <th style={styles.th}>Current Position</th>
              <th style={styles.th}>Semester Load</th>
              <th style={styles.th}>Service Years</th>
              <th style={styles.th}>Publications</th>
              <th style={styles.th}>Country</th>
              <th style={styles.th}>Telephone</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>ORCID</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
                    <tbody>

            {filteredFaculty.length === 0 ? (

              <tr>
               <td colSpan="16" style={styles.empty}>
                  No Faculty Records Found
                </td>
              </tr>

            ) : (

              filteredFaculty.map((item, index) => (

                <tr
                  key={item._id}
                  style={{
                    ...styles.row,
                    backgroundColor:
                      index % 2 === 0
                        ? "#f8fafc"
                        : "#ffffff",
                  }}
                >

                  {/* PHOTO */}
<td style={styles.td}>
  {item.photo ? (
    <img
      src={item.photo}
      alt="Faculty"
      style={styles.photo}
    />
  ) : (
    <div style={styles.noPhoto}>
      👤
    </div>
  )}
</td>


                  {/* NAME */}
                  <td style={styles.td}>
                    <span
                      style={styles.name}
                      onClick={() => onView(item._id)}
                    >
                      {item.title || ""} {item.fullName || "-"}
                    </span>
                  </td>


                  {/* GENDER */}
                  <td style={styles.td}>
                    {item.gender || "-"}
                  </td>


                  {/* QUALIFICATION */}
                  <td style={styles.td}>
                    {item.qualification || "-"}
                  </td>


                  {/* SPECIALIZATION */}
                  <td style={styles.td}>
                    {item.fieldOfSpecialization || "-"}
                  </td>


                  {/* ACADEMIC RANK */}
                  <td style={styles.td}>
                    {item.academicRank || "-"}
                  </td>


                  {/* CURRENT POSITION */}
                  <td style={styles.td}>
                    {item.currentPosition || "-"}
                  </td>


                  {/* SEMESTER LOAD */}
                  <td style={styles.td}>
                    {item.semesterLoad ?? 0}
                  </td>


                  {/* SERVICE YEARS */}
                  <td style={styles.td}>
                    {item.serviceYear ?? 0}
                  </td>


                  {/* PUBLICATIONS */}
                  <td style={styles.td}>
                    {item.totalPublications ?? 0}
                  </td>


                  {/* COUNTRY */}
                  <td style={styles.td}>
                    {item.country || "-"}
                  </td>

                  {/* TELEPHONE */}
                  <td style={styles.td}>
                  {item.telephone || "-"}
                   </td>


                  {/* EMAIL */}
                  <td style={styles.td}>
                    {item.email ? (
                      <a
                        href={`mailto:${item.email}`}
                        style={styles.emailLink}
                      >
                        {item.email}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>


                  {/* ORCID */}
                  <td style={styles.td}>
                    {item.orcid ? (
                      <a
                        href={
                          item.orcid.startsWith("http")
                            ? item.orcid
                            : `https://orcid.org/${item.orcid}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.orcidLink}
                      >
                        {item.orcid}
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>


                  {/* STATUS */}
                  <td style={styles.td}>
                    <span
                      style={
                        item.currentStatus === "Active"
                          ? styles.active
                          : item.currentStatus === "Sabbatical Leave" ||
                            item.currentStatus === "Study Leave"
                          ? styles.leave
                          : styles.inactive
                      }
                    >
                      {item.currentStatus || "-"}
                    </span>
                  </td>


                  {/* ACTIONS */}
                  <td style={styles.td}>

                    <div style={styles.actionButtons}>

                      <button
                        style={styles.view}
                        onClick={() => onView(item._id)}
                      >
                        👁 View
                      </button>


                      {isAdmin && (
                        <>

                          <button
                            style={styles.edit}
                            onClick={() => onEdit(item._id)}
                          >
                            ✏ Edit
                          </button>


                          <button
                            style={styles.delete}
                            onClick={() => onDelete(item._id)}
                          >
                            🗑 Delete
                          </button>

                        </>
                      )}

                    </div>

                  </td>


                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );
}

const styles = {

  wrapper: {
    width: "100%",
    padding: "20px",
    boxSizing: "border-box",
  },


  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "25px",
    flexWrap: "wrap",
    padding: "18px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
  },


  count: {
    margin: 0,
    fontSize: "20px",
    minWidth: "220px",
  },


  search: {
    padding: "12px 16px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    width: "280px",
    boxShadow: "0 2px 6px rgba(0,0,0,.05)",
  },


  select: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    backgroundColor: "#ffffff",
    fontSize: "15px",
  },


  download: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    backgroundColor: "#16a34a",
    color: "#ffffff",
    fontWeight: "bold",
  },


  container: {
    width: "100%",
    overflowX: "auto",
    background: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,.08)",
  },


  table: {
  width: "100%",
  borderCollapse: "collapse",
  tableLayout: "auto",
  fontSize: "14px",
  border: "1px solid #d1d5db",
},


 th: {
  padding: "8px 10px",
  textAlign: "left",
  backgroundColor: "#1e40af",
  color: "#fff",
  fontWeight: "bold",
  whiteSpace: "nowrap",
  border: "1px solid #d1d5db",
},


  td: {
  padding: "6px 8px",
  textAlign: "left",
  verticalAlign: "middle",
  whiteSpace: "nowrap",
  border: "1px solid #d1d5db",
},


  row: {
    transition: "all 0.2s ease",
    backgroundColor: "#ffffff",
  },


  photo: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #2563eb",
  },


  noPhoto: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    background: "#e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },


  name: {
    color: "#1d4ed8",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
  },


  emailLink: {
    color: "#1565c0",
    textDecoration: "none",
  },


  orcidLink: {
    color: "#2e7d32",
    textDecoration: "none",
  },


  active: {
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "5px 10px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
    display: "inline-block",
  },


  leave: {
    backgroundColor: "#fff3cd",
    color: "#856404",
    padding: "5px 10px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
    display: "inline-block",
  },


  inactive: {
    backgroundColor: "#f8d7da",
    color: "#721c24",
    padding: "5px 10px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "600",
    display: "inline-block",
  },


  actionButtons: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },


  view: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontWeight: "600",
  },


  edit: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#f59e0b",
    color: "#ffffff",
    fontWeight: "600",
  },


  delete: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#dc2626",
    color: "#ffffff",
    fontWeight: "600",
  },


  empty: {
    textAlign: "center",
    padding: "30px",
    color: "#666666",
    fontSize: "16px",
  },

};