import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import countryList from "react-select-country-list";
import { countries as countryData } from "country-data";

import { getToken } from "../utils/auth";

const API = `${import.meta.env.VITE_API_URL}/faculty`;

const countryOptions = countryList().getData();

export default function EditFaculty() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [photoFile, setPhotoFile] = useState(null);

  const [otherQualification, setOtherQualification] = useState("");
  const [otherSpecialization, setOtherSpecialization] = useState("");
  const [otherRank, setOtherRank] = useState("");
  const [otherPosition, setOtherPosition] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    gender: "Male",

    qualification: "",

    fieldOfSpecialization: "",

    academicRank: "",

    currentPosition: "",

    semesterLoad: 0,

    serviceYear: 0,

    numberOfPublications: 0,

    publicationHistory: {},

    country: "Ethiopia",

    countryCode: "+251",

    telephone: "",

    email: "",

    orcid: "",

    currentStatus: "Active",

    photo: ""
  });

  useEffect(() => {
    loadFaculty();
  }, []);

  const loadFaculty = async () => {
  try {
    const token = getToken();

    console.log("Token:", token);
    console.log("Faculty ID:", id);

    const res = await axios.get(`${API}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("========== BACKEND RESPONSE ==========");
    console.log(res.data);
    console.log("======================================");

    const faculty = res.data.faculty || res.data.data || res.data;

    setFormData({
      title: faculty.title || "",
      fullName: faculty.fullName || "",
      gender: faculty.gender || "Male",

      qualification: faculty.qualification || "",
      fieldOfSpecialization: faculty.fieldOfSpecialization || "",
      academicRank: faculty.academicRank || "",
      currentPosition: faculty.currentPosition || "",

      semesterLoad: faculty.semesterLoad || 0,
      serviceYear: faculty.serviceYear || 0,
      numberOfPublications: faculty.numberOfPublications || 0,

      publicationHistory: faculty.publicationHistory || {},

      country: faculty.country || "Ethiopia",
      countryCode: faculty.countryCode || "+251",
      telephone: faculty.telephone || "",
      email: faculty.email || "",
      orcid: faculty.orcid || "",

      currentStatus: faculty.currentStatus || "Active",
      photo: faculty.photo || "",
    });

  } catch (err) {
    console.error("LOAD ERROR:", err);

    if (err.response) {
      console.log("Status:", err.response.status);
      console.log("Response:", err.response.data);
    }

    setError("Unable to load faculty information.");

  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {

  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));

};

const handlePhoto = (e) => {

  if (e.target.files.length > 0) {
    setPhotoFile(e.target.files[0]);
  }

};

const handleTelephoneChange = (e) => {

  const value = e.target.value.replace(/\D/g, "");

  setFormData((prev) => ({
    ...prev,
    telephone: value
  }));

};

const handleCountryChange = (e) => {

  const countryName = e.target.value;

  const country = Object.values(countryData.all).find(
    (c) => c.name === countryName
  );

  const callingCode =
    country && country.countryCallingCodes.length > 0
      ? country.countryCallingCodes[0].replace(/\s/g, "")
      : "";

  setFormData((prev) => ({
    ...prev,
    country: countryName,
    countryCode: callingCode
  }));

};

const handlePublicationChange = (year, value) => {

  setFormData((prev) => ({
    ...prev,
    publicationHistory: {
      ...prev.publicationHistory,
      [year]: Number(value)
    }
  }));

};

const handleSubmit = async (e) => {
    e.preventDefault();

  setSaving(true);

  try {

    const data = new FormData();

    const finalData = {

      ...formData,

      qualification:
        formData.qualification === "Other"
          ? otherQualification
          : formData.qualification,

      fieldOfSpecialization:
        formData.fieldOfSpecialization === "Other"
          ? otherSpecialization
          : formData.fieldOfSpecialization,

      academicRank:
        formData.academicRank === "Other"
          ? otherRank
          : formData.academicRank,

      currentPosition:
        formData.currentPosition === "Other"
          ? otherPosition
          : formData.currentPosition

    };

    Object.keys(finalData).forEach((key) => {

      if (key === "publicationHistory") {

        data.append(
          key,
          JSON.stringify(finalData[key])
        );

      } else {

        data.append(
          key,
          finalData[key]
        );

      }

    });

    if (photoFile) {

      data.append(
        "photo",
        photoFile
      );

    }

    await axios.put(

      `${API}/${id}`,

      data,

      {

        headers: {

          Authorization: `Bearer ${getToken()}`,

          "Content-Type": "multipart/form-data"

        }

      }

    );

    alert("Faculty record updated successfully.");

    navigate("/faculty");

  }

  catch (err) {

    console.error(err);

    alert("Update failed.");

  }

  finally {

    setSaving(false);

  }

};

if (loading) {

  return (

    <div style={styles.loading}>

      Loading faculty information...

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

    <h1 style={styles.title}>
      ✏️ Edit Faculty Member
    </h1>

    <p style={styles.subtitle}>
      Update faculty information.
    </p>

    <form
      onSubmit={handleSubmit}
      style={styles.form}
    >

      {/* ================= PHOTO ================= */}

      <div style={styles.photoSection}>

        {
  photoFile || formData.photo ? (

    <img
      src={
        photoFile
          ? URL.createObjectURL(photoFile)
          : `${import.meta.env.VITE_API_URL.replace("/api", "")}${formData.photo}`
      }
      alt="Faculty"
      style={styles.photo}
    />

  ) : (

    <div style={styles.noPhoto}>
      👤
    </div>

  )
}
        <div>

          <label style={styles.label}>
            Change Photo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handlePhoto}
          />

        </div>

      </div>

      {/* ================= BASIC INFORMATION ================= */}

      <div style={styles.grid}>

        {/* TITLE */}

        <div>

          <label style={styles.label}>
            Title
          </label>

          <select
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={styles.input}
          >

            <option value="">Select Title</option>
            <option value="Prof.">Prof.</option>
            <option value="Assoc. Prof.">Assoc. Prof.</option>
            <option value="Dr.">Dr.</option>
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Ms.">Ms.</option>
            <option value="Miss">Miss</option>
            <option value="Rev.">Rev.</option>
            <option value="Eng.">Eng.</option>

          </select>

        </div>

        {/* FULL NAME */}

        <div>

          <label style={styles.label}>
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={styles.input}
          />

        </div>

        {/* GENDER */}

        <div>

          <label style={styles.label}>
            Gender
          </label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={styles.input}
          >

            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>

          </select>

        </div>
                {/* ================= QUALIFICATION ================= */}

        <div>

          <label style={styles.label}>
            Qualification
          </label>

          <select
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            style={styles.input}
          >

            <option value="">Select Qualification</option>
            <option value="Post Doc">Post Doc</option>
            <option value="PhD">PhD</option>
            <option value="MSc">MSc</option>
            <option value="BSc">BSc</option>
            <option value="Diploma">Diploma</option>
            <option value="Certificate">Certificate</option>
            <option value="Other">Other</option>

          </select>

          {formData.qualification === "Other" && (

            <input
              type="text"
              placeholder="Specify qualification"
              value={otherQualification}
              onChange={(e) =>
                setOtherQualification(e.target.value)
              }
              style={{
                ...styles.input,
                marginTop: "8px"
              }}
            />

          )}

        </div>

        {/* ================= FIELD OF SPECIALIZATION ================= */}

        <div>

          <label style={styles.label}>
            Field of Specialization
          </label>

          <select
            name="fieldOfSpecialization"
            value={formData.fieldOfSpecialization}
            onChange={handleChange}
            style={styles.input}
          >

            <option value="">Select Specialization</option>

            <option value="Medical Microbiology">
              Medical Microbiology
            </option>

            <option value="Medical Parasitology">
              Medical Parasitology
            </option>

            <option value="Hematology">
              Hematology
            </option>

            <option value="Clinical Chemistry">
              Clinical Chemistry
            </option>

            <option value="Immunology">
              Immunology
            </option>

            <option value="Molecular Biology">
              Molecular Biology
            </option>

            <option value="Public Health">
              Public Health
            </option>

            <option value="Other">
              Other
            </option>

          </select>

          {formData.fieldOfSpecialization === "Other" && (

            <input
              type="text"
              placeholder="Specify specialization"
              value={otherSpecialization}
              onChange={(e) =>
                setOtherSpecialization(e.target.value)
              }
              style={{
                ...styles.input,
                marginTop: "8px"
              }}
            />

          )}

        </div>

        {/* ================= ACADEMIC RANK ================= */}

        <div>

          <label style={styles.label}>
            Academic Rank
          </label>

          <select
            name="academicRank"
            value={formData.academicRank}
            onChange={handleChange}
            style={styles.input}
          >

            <option value="">Select Academic Rank</option>

            <option value="Graduate Assistant">
              Graduate Assistant
            </option>

            <option value="Assistant Lecturer">
              Assistant Lecturer
            </option>

            <option value="Lecturer">
              Lecturer
            </option>

            <option value="Assistant Professor">
              Assistant Professor
            </option>

            <option value="Associate Professor">
              Associate Professor
            </option>

            <option value="Professor">
              Professor
            </option>

            <option value="Other">
              Other
            </option>

          </select>

          {formData.academicRank === "Other" && (

            <input
              type="text"
              placeholder="Specify academic rank"
              value={otherRank}
              onChange={(e) =>
                setOtherRank(e.target.value)
              }
              style={{
                ...styles.input,
                marginTop: "8px"
              }}
            />

          )}

        </div>

        {/* ================= CURRENT POSITION ================= */}

        <div>

          <label style={styles.label}>
            Current Position
          </label>

          <select
            name="currentPosition"
            value={formData.currentPosition}
            onChange={handleChange}
            style={styles.input}
          >

            <option value="">Select Current Position</option>

            <option value="Dean">
              Dean
            </option>

            <option value="Vice Dean">
              Vice Dean
            </option>

            <option value="Department Head">
              Department Head
            </option>

            <option value="Program Coordinator">
              Program Coordinator
            </option>

            <option value="Instructor">
              Instructor
            </option>

            <option value="Researcher">
              Researcher
            </option>

            <option value="Other">
              Other
            </option>

          </select>

          {formData.currentPosition === "Other" && (

            <input
              type="text"
              placeholder="Specify current position"
              value={otherPosition}
              onChange={(e) =>
                setOtherPosition(e.target.value)
              }
              style={{
                ...styles.input,
                marginTop: "8px"
              }}
            />

          )}

        </div>

                {/* ================= SEMESTER LOAD ================= */}

        <div>

          <label style={styles.label}>
            Semester Load
          </label>

          <input
            type="number"
            name="semesterLoad"
            value={formData.semesterLoad}
            onChange={handleChange}
            style={styles.input}
          />

        </div>


        {/* ================= YEARS OF SERVICE ================= */}

        <div>

          <label style={styles.label}>
            Years of Service
          </label>

          <input
            type="number"
            name="serviceYear"
            value={formData.serviceYear}
            onChange={handleChange}
            style={styles.input}
          />

        </div>


        {/* ================= NUMBER OF PUBLICATIONS ================= */}

        <div>

          <label style={styles.label}>
            Number of Publications
          </label>

          <input
            type="number"
            name="numberOfPublications"
            value={formData.numberOfPublications}
            onChange={handleChange}
            style={styles.input}
          />

        </div>



        {/* ================= PUBLICATION HISTORY ================= */}

        <div
          style={{
            gridColumn: "1 / -1"
          }}
        >

          <label style={styles.label}>
            Publication History
          </label>


          <div
            style={{
              display:"grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(120px,1fr))",
              gap:"15px",
              marginTop:"10px"
            }}
          >

            {
              Array.from(
                {
                  length: 17
                },
                (_, index) => 2010 + index
              ).map((year) => (

                <div key={year}>

                  <label
                    style={{
                      ...styles.label,
                      fontSize:"14px"
                    }}
                  >
                    {year}
                  </label>


                  <input
                    type="number"
                    min="0"
                    value={
                      formData.publicationHistory?.[year] || ""
                    }
                    onChange={(e) =>
                      handlePublicationChange(
                        year,
                        e.target.value
                      )
                    }
                    style={styles.input}
                  />

                </div>

              ))
            }

          </div>

        </div>
                {/* ================= COUNTRY ================= */}

        <div>

          <label style={styles.label}>
            Country
          </label>

          <select
            name="country"
            value={formData.country}
            onChange={handleCountryChange}
            style={styles.input}
          >

            <option value="">
              Select Country
            </option>

            {
              countryOptions.map((country) => (

                <option
                  key={country.value}
                  value={country.label}
                >
                  {country.label}
                </option>

              ))
            }

          </select>

        </div>



        {/* ================= COUNTRY CODE ================= */}

        <div>

          <label style={styles.label}>
            Country Code
          </label>

          <input
            type="text"
            name="countryCode"
            value={formData.countryCode}
            readOnly
            style={{
              ...styles.input,
              background:"#f1f5f9"
            }}
          />

        </div>



        {/* ================= TELEPHONE ================= */}

        <div>

          <label style={styles.label}>
            Telephone
          </label>

          <input
            type="text"
            name="telephone"
            value={formData.telephone}
            onChange={handleTelephoneChange}
            style={styles.input}
            placeholder="Phone number"
          />

        </div>



        {/* ================= EMAIL ================= */}

        <div>

          <label style={styles.label}>
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            placeholder="example@email.com"
          />

        </div>



        {/* ================= ORCID ================= */}

        <div>

          <label style={styles.label}>
            ORCID
          </label>

          <input
            type="text"
            name="orcid"
            value={formData.orcid}
            onChange={handleChange}
            style={styles.input}
            placeholder="ORCID ID"
          />

        </div>



        {/* ================= STATUS ================= */}

        <div>

          <label style={styles.label}>
            Current Status
          </label>

          <select
            name="currentStatus"
            value={formData.currentStatus}
            onChange={handleChange}
            style={styles.input}
          >

            <option value="Active">
              Active
            </option>

            <option value="On Leave">
              On Leave
            </option>

            <option value="Retired">
              Retired
            </option>

            <option value="Inactive">
              Inactive
            </option>

          </select>

        </div>


      </div>



      {/* ================= BUTTONS ================= */}

      <div style={styles.buttonGroup}>


        <button
          type="submit"
          style={styles.saveButton}
          disabled={saving}
        >

          {
            saving
              ? "Saving..."
              : "💾 Save Changes"
          }

        </button>



        <button
          type="button"
          style={styles.cancelButton}
          onClick={() => navigate("/faculty")}
        >

          Cancel

        </button>


      </div>


    </form>


  </div>

);

}

// ======================================
// STYLES
// ======================================

const styles = {

  loading: {

    height: "70vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    fontSize: "22px",

    fontWeight: "bold",

    color: "#334155"

  },


  error: {

    margin: "30px",

    padding: "20px",

    background: "#fee2e2",

    color: "#991b1b",

    borderRadius: "10px",

    fontWeight: "bold"

  },


  container: {

    maxWidth: "1200px",

    margin: "30px auto",

    background: "#ffffff",

    borderRadius: "12px",

    padding: "30px",

    boxShadow: "0 5px 20px rgba(0,0,0,.1)"

  },


  title: {

    marginBottom: "8px",

    color: "#0f172a",

    fontSize: "28px"

  },


  subtitle: {

    color: "#64748b",

    marginBottom: "30px",

    fontSize: "16px"

  },


  form: {

    display: "flex",

    flexDirection: "column",

    gap: "25px"

  },


  photoSection: {

    display: "flex",

    alignItems: "center",

    gap: "25px",

    flexWrap: "wrap"

  },


  photo: {

    width: "130px",

    height: "130px",

    borderRadius: "50%",

    objectFit: "cover",

    border: "3px solid #cbd5e1"

  },


  noPhoto: {

    width: "130px",

    height: "130px",

    borderRadius: "50%",

    background: "#e2e8f0",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    fontSize: "55px"

  },


  grid: {

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",

    gap: "20px"

  },


  label: {

    display: "block",

    marginBottom: "8px",

    fontWeight: "bold",

    color: "#334155",

    fontSize: "15px"

  },


  input: {

    width: "100%",

    padding: "12px",

    border: "1px solid #cbd5e1",

    borderRadius: "8px",

    fontSize: "15px",

    background: "#ffffff",

    boxSizing: "border-box",

    outline: "none"

  },


  buttonGroup: {

    display: "flex",

    justifyContent: "flex-end",

    gap: "15px",

    marginTop: "20px",

    flexWrap: "wrap"

  },


  saveButton: {

    background: "#2563eb",

    color: "#ffffff",

    border: "none",

    padding: "12px 24px",

    borderRadius: "8px",

    fontSize: "16px",

    fontWeight: "bold",

    cursor: "pointer",

    transition: "0.2s"

  },


  cancelButton: {

    background: "#64748b",

    color: "#ffffff",

    border: "none",

    padding: "12px 24px",

    borderRadius: "8px",

    fontSize: "16px",

    cursor: "pointer",

    transition: "0.2s"

  }

};