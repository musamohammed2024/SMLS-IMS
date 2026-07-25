const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
{
  // ==========================
  // TITLE
  // ==========================

  title: {
    type: String,
    enum: [
      "",
      "Professor",
      "Dr.",
      "Mr.",
      "Mrs.",
      "Ms.",
      "Miss"
    ],
    default: ""
  },


  // ==========================
  // FULL NAME
  // ==========================

  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },


  // ==========================
  // GENDER
  // ==========================

  gender: {
    type: String,
    enum: [
      "Male",
      "Female"
    ],
    default: "Male"
  },


  // ==========================
  // QUALIFICATION
  // ==========================

  qualification: {
    type: String,
    enum: [
      "Postdoctoral",
      "PhD",
      "MSc",
      "BSc",
      "Diploma",
      "Other"
    ],
    required: true
  },


  otherQualification: {
    type: String,
    default: ""
  },


  // ==========================
  // SPECIALIZATION
  // ==========================

  fieldOfSpecialization: {
    type: String,
    enum: [
      "Medical Microbiology",
      "Medical Parasitology",
      "Hematology",
      "Infectious Disease",
      "Clinical Chemistry",
      "Molecular Biology",
      "Other"
    ],
    required: true
  },


  otherSpecialization: {
    type: String,
    default: ""
  },


  // ==========================
  // ACADEMIC RANK
  // ==========================

  academicRank: {
    type: String,
    enum: [
      "Professor",
      "Associate Professor",
      "Assistant Professor",
      "Lecturer",
      "Graduate Assistant",
      "Technical Assistant",
      "Lab Assistant",
      "Secretary",
      "Other"
    ],
    required: true
  },


  otherRank: {
    type: String,
    default: ""
  },


  // ==========================
  // CURRENT POSITION
  // ==========================

  currentPosition: {
    type: String,
    trim: true,
    default: ""
  },


  // ==========================
  // TEACHING LOAD
  // ==========================

  semesterLoad: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },


  // ==========================
  // SERVICE YEARS
  // ==========================

  serviceYear: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },


  // ==========================
  // PUBLICATIONS
  // ==========================

  publicationsByYear: {
    type: Map,
    of: Number,
    default: {}
  },


  totalPublications: {
    type: Number,
    default: 0,
    min: 0
  },


  // ==========================
  // COUNTRY
  // ==========================

  country: {
    type: String,
    default: "Ethiopia",
    trim: true
  },


  // ==========================
  // TELEPHONE
  // ==========================

  telephone: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^\+[1-9]\d{7,14}$/,
      "Invalid phone number"
    ]
  },


  // ==========================
  // EMAIL
  // ==========================

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Invalid email address"
    ]
  },


  // ==========================
  // ORCID
  // ==========================

  orcid: {
    type: String,
    default: "",
    trim: true,
    validate: {
      validator: function(value) {

        if (!value || value.trim() === "") {
          return true;
        }

        return /^(https?:\/\/orcid\.org\/)?\d{4}-\d{4}-\d{4}-\d{3}[\dX]$/.test(value);

      },
      message: "Invalid ORCID format"
    }
  },


  // ==========================
  // CURRENT STATUS
  // ==========================

  currentStatus: {
    type: String,
    enum: [
      "Active",
      "Sabbatical Leave",
      "Study Leave",
      "Retired",
      "Resigned",
      "Deceased",
      "Other"
    ],
    default: "Active"
  },


  // ==========================
  // PHOTO
  // ==========================

  photo: {
    type: String,
    default: ""
  }

},
{
  timestamps: true
});


// ==========================
// INDEX
// ==========================

facultySchema.index({
  fullName: 1
});


module.exports = mongoose.model(
  "Faculty",
  facultySchema
);