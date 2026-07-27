 import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createFaculty } from "../services/facultyService";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";



export default function AddFaculty() {


  const navigate = useNavigate();


  // ===============================
  // PHOTO REF
  // ===============================

  const fileInputRef = useRef(null);



  // ===============================
  // FORM DATA
  // ===============================

  const [form, setForm] = useState({

    title: "",

    fullName: "",

    gender: "Male",

    qualification: "",

    fieldOfSpecialization: "",

    academicRank: "",

    currentPosition: "",

    semesterLoad: 0,

    serviceYear: 0,


    // Publications

    publicationsByYear: {},

    totalPublications: 0,


    country: "Ethiopia",

    telephone: "",

    email: "",

    orcid: "",

    currentStatus: "Active",

  });



  // ===============================
  // PHOTO STATES
  // ===============================

  const [photo, setPhoto] = useState(null);

  const [photoPreview, setPhotoPreview] = useState(null);



  const [loading, setLoading] = useState(false);



  // ===============================
  // PUBLICATION STATES
  // ===============================

  const [showPublications, setShowPublications] =
    useState(false);



  const [selectedPublicationYears,
    setSelectedPublicationYears] =
    useState([]);



  // ===============================
  // YEARS
  // ===============================


  const startYear = 2010;


  const currentYear = new Date().getFullYear();



  const publicationYears = Array.from(

    {
      length:
        currentYear + 10 - startYear + 1
    },

    (_, index) =>
      startYear + index

  );



  // ===============================
  // INPUT CHANGE
  // ===============================


  const handleChange = (e)=>{


    const {name,value} = e.target;


    setForm({

      ...form,

      [name]: value

    });


  };



  // ===============================
  // PHOTO SELECT
  // ===============================


  const handlePhotoChange = (e)=>{


    const selectedPhoto =
      e.target.files[0];



    if(selectedPhoto){


      setPhoto(selectedPhoto);



      setPhotoPreview(

        URL.createObjectURL(selectedPhoto)

      );


    }


  };



  // ===============================
  // REMOVE PHOTO
  // ===============================


  const removePhoto = ()=>{


    setPhoto(null);


    setPhotoPreview(null);



    if(fileInputRef.current){

      fileInputRef.current.value = "";

    }


  };



  // ===============================
  // SUBMIT
  // ===============================


  const handleSubmit = async(e)=>{


    e.preventDefault();


    try{


      setLoading(true);



      const data = new FormData();



      Object.entries(form).forEach(([key,value])=>{


        if(key==="publicationsByYear"){


          data.append(

            key,

            JSON.stringify(value)

          );


        }

        else{


          data.append(

            key,

            value

          );


        }


      });



      if(photo){


        data.append(

          "photo",

          photo

        );


      }



      await createFaculty(data);



      alert(

        "Faculty added successfully"

      );



      navigate("/faculty");



    }

    catch(error){


      console.log(

        "ERROR:",

        error

      );



      alert(

        error.response?.data?.message ||

        error.message

      );


    }


    finally{


      setLoading(false);


    }


  };

    return (

    <div>


      <h1 style={styles.heading}>
        ➕ Add Faculty
      </h1>



      <form

        onSubmit={handleSubmit}

        style={styles.form}

        encType="multipart/form-data"

      >



        {/* ==========================
            PHOTO UPLOAD
        ========================== */}


        <label style={styles.label}>
          Photo
        </label>



        <input

          ref={fileInputRef}

          style={styles.input}

          type="file"

          accept="image/*"

          onChange={handlePhotoChange}

        />



        {photoPreview && (


          <div

            style={{

              marginTop:"15px",

              display:"flex",

              alignItems:"center",

              gap:"15px"

            }}

          >



            <img

              src={photoPreview}

              alt="Preview"

              style={{

                width:"100px",

                height:"100px",

                borderRadius:"50%",

                objectFit:"cover",

                border:"2px solid #2563eb"

              }}

            />



            <button

              type="button"

              onClick={removePhoto}

              style={{

                background:"#dc2626",

                color:"#fff",

                border:"none",

                padding:"10px 15px",

                borderRadius:"6px",

                cursor:"pointer"

              }}

            >

              Remove Photo

            </button>


          </div>


        )}






        {/* ==========================
            FULL NAME
        ========================== */}


        <label style={styles.label}>
          Full Name
        </label>


        <input

          style={styles.input}

          type="text"

          name="fullName"

          value={form.fullName}

          onChange={handleChange}

          required

        />





        {/* ==========================
            TITLE
        ========================== */}


        <label style={styles.label}>
          Title
        </label>



        <select

          style={styles.input}

          name="title"

          value={form.title}

          onChange={handleChange}

          required

        >


          <option value="">
            Select Title
          </option>


          <option value="Professor">
            Professor
          </option>


          <option value="Dr.">
            Dr.
          </option>


          <option value="Mr.">
            Mr.
          </option>


          <option value="Mrs.">
            Mrs.
          </option>


          <option value="Ms.">
            Ms.
          </option>


          <option value="Miss">
            Miss
          </option>


        </select>





        {/* ==========================
            GENDER
        ========================== */}


        <label style={styles.label}>
          Gender
        </label>



        <select

          style={styles.input}

          name="gender"

          value={form.gender}

          onChange={handleChange}

        >


          <option value="Male">
            Male
          </option>


          <option value="Female">
            Female
          </option>


        </select>





        {/* ==========================
            QUALIFICATION
        ========================== */}


        <label style={styles.label}>
          Highest Qualification
        </label>



        <select

          style={styles.input}

          name="qualification"

          value={form.qualification}

          onChange={handleChange}

          required

        >


          <option value="">
            Select Qualification
          </option>


          <option value="Postdoctoral">
            Postdoctoral
          </option>


          <option value="PhD">
            PhD
          </option>


          <option value="MSc">
            MSc
          </option>


          <option value="BSc">
            BSc
          </option>


          <option value="Diploma">
            Diploma
          </option>


          <option value="Other">
            Other
          </option>


        </select>





        {/* ==========================
            FIELD OF SPECIALIZATION
        ========================== */}


        <label style={styles.label}>
          Field of Specialization
        </label>



        <select

          style={styles.input}

          name="fieldOfSpecialization"

          value={form.fieldOfSpecialization}

          onChange={handleChange}

          required

        >


          <option value="">
            Select Field
          </option>


          <option value="Medical Microbiology">
            Medical Microbiology
          </option>


          <option value="Medical Parasitology">
            Medical Parasitology
          </option>


          <option value="Hematology">
            Hematology
          </option>


          <option value="Infectious Disease">
            Infectious Disease
          </option>


          <option value="Clinical Chemistry">
            Clinical Chemistry
          </option>


          <option value="Molecular Biology">
            Molecular Biology
          </option>


          <option value="Other">
            Other
          </option>


        </select>





        {/* ==========================
            ACADEMIC RANK
        ========================== */}


        <label style={styles.label}>
          Academic Rank
        </label>



        <select

          style={styles.input}

          name="academicRank"

          value={form.academicRank}

          onChange={handleChange}

          required

        >


          <option value="">
            Select Rank
          </option>


          <option value="Professor">
            Professor
          </option>


          <option value="Associate Professor">
            Associate Professor
          </option>


          <option value="Assistant Professor">
            Assistant Professor
          </option>


          <option value="Lecturer">
            Lecturer
          </option>

           <option value="Graduate Assistant">
Graduate Assistant
</option>
          <option value="Technical Assistant">
            Technical Assistant
          </option>


          <option value="Lab Assistant">
            Lab Assistant
          </option>


          <option value="Secretary">
            Secretary
          </option>


          <option value="Other">
            Other
          </option>


        </select>





        {/* ==========================
            CURRENT POSITION
        ========================== */}


        <label style={styles.label}>
          Current Position
        </label>



        <select
style={styles.input}
name="currentPosition"
value={form.currentPosition}
onChange={handleChange}
>

<option value="">
Select Current Position
</option>

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





        {/* ==========================
            SEMESTER LOAD
        ========================== */}


        <label style={styles.label}>
          Semester Teaching Load
        </label>



        <input

          style={styles.input}

          type="number"

          name="semesterLoad"

          value={form.semesterLoad}

          onChange={handleChange}

          min="0"

        />





        {/* ==========================
            SERVICE YEAR
        ========================== */}


        <label style={styles.label}>
          Years of Service
        </label>



        <input

          style={styles.input}

          type="number"

          name="serviceYear"

          value={form.serviceYear}

          onChange={handleChange}

          min="0"

        />

                {/* ==========================
            PUBLICATION SECTION
        ========================== */}


        <label style={styles.label}>
          Publications
        </label>



        <button

          type="button"

          style={styles.secondaryButton}

          onClick={() =>
            setShowPublications(!showPublications)
          }

        >

          {showPublications
            ? "Hide Publication Records"
            : "+ Add Yearly Publications"}

        </button>




        {showPublications && (

          <div style={styles.publicationBox}>


            <label style={styles.label}>
              Select Publication Year
            </label>



            <select

              style={styles.input}

              onChange={(e)=>{

                const year = e.target.value;


                if(
                  year &&
                  !selectedPublicationYears.includes(year)
                ){

                  setSelectedPublicationYears([

                    ...selectedPublicationYears,

                    year

                  ]);

                }


                e.target.value="";

              }}

            >


              <option value="">
                Select Year
              </option>



              {publicationYears.map((year)=>(

                <option

                  key={year}

                  value={year}

                >

                  {year}

                </option>

              ))}


            </select>




            {selectedPublicationYears.map((year)=>(


              <div key={year}>


                <label style={styles.label}>

                  {year} Publications

                </label>



                <input

                  style={styles.input}

                  type="number"

                  min="0"


                  value={
                    form.publicationsByYear[year] || ""
                  }



                  onChange={(e)=>{


                    const updated = {


                      ...form.publicationsByYear,


                      [year]:

                      e.target.value === ""

                      ? 0

                      : Number(e.target.value)


                    };



                    const total =

                      Object.values(updated)

                      .reduce(

                        (sum,value)=>

                          sum + value,

                        0

                      );



                    setForm({

                      ...form,

                      publicationsByYear: updated,

                      totalPublications: total

                    });



                  }}


                />


              </div>


            ))}


          </div>

        )}






        {/* TOTAL PUBLICATIONS */}


        <label style={styles.label}>
          Total Publications
        </label>



        <input

          style={styles.input}

          type="number"

          value={form.totalPublications}

          readOnly

        />







        {/* ==========================
            TELEPHONE
        ========================== */}


        <label style={styles.label}>
          Telephone Number
        </label>



        <PhoneInput

          country="et"

          enableSearch

          disableSearchIcon

          countryCodeEditable={false}

          searchPlaceholder="Search country..."

          value={form.telephone}



          onChange={(phone,country)=>{


            setForm({

              ...form,

              telephone:`+${phone}`,

              country:country.name

            });


          }}



          inputProps={{

            name:"telephone",

            required:true

          }}



          containerStyle={{

            width:"100%"

          }}



          inputStyle={{

            width:"100%",

            height:"45px",

            fontSize:"15px",

            borderRadius:"8px"

          }}


        />







        {/* EMAIL */}


        <label style={styles.label}>
          Email Address
        </label>



        <input

          style={styles.input}

          type="email"

          name="email"

          value={form.email}

          onChange={handleChange}

          placeholder="example@email.com"

          required

        />







        {/* ORCID */}


        <label style={styles.label}>
          ORCID ID
        </label>



        <input

          style={styles.input}

          type="text"

          name="orcid"

          value={form.orcid}



          onChange={(e)=>{


            let value =
              e.target.value.trim();



            if(value.includes("my-orcid?orcid=")){


              value =
              "https://orcid.org/" +

              value.split(
                "my-orcid?orcid="
              )[1];

            }



            setForm({

              ...form,

              orcid:value

            });


          }}



          placeholder="https://orcid.org/0000-0001-7786-3400"

        />







        {/* CURRENT STATUS */}


        <label style={styles.label}>
          Current Status
        </label>



        <select

          style={styles.input}

          name="currentStatus"

          value={form.currentStatus}

          onChange={handleChange}

          required

        >


          <option value="Active">
            Active
          </option>


          <option value="Study Leave">
            Study Leave
          </option>


          <option value="Sabbatical Leave">
            Sabbatical Leave
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


        </select>







        {/* SAVE BUTTON */}


        <button

          type="submit"

          disabled={loading}

          style={styles.button}

        >

          {loading
            ? "Saving..."
            : "Save Faculty"}

        </button>



      </form>


    </div>

  );


}




// ===============================
// STYLES
// ===============================


const styles = {


  heading: {

    textAlign:"center",

    color:"#1e3a8a",

    marginBottom:"25px",

    fontSize:"30px",

    fontWeight:"bold",

  },



  form: {

    display:"grid",

    gap:"16px",

    background:"#ffffff",

    padding:"35px",

    borderRadius:"12px",

    maxWidth:"750px",

    margin:"30px auto",

    boxShadow:"0 8px 20px rgba(0,0,0,0.12)",

  },



  label: {

    fontWeight:"600",

    color:"#374151",

    marginBottom:"-8px",

    fontSize:"15px",

  },



  input: {

    width:"100%",

    padding:"12px",

    border:"1px solid #d1d5db",

    borderRadius:"8px",

    fontSize:"15px",

    outline:"none",

    boxSizing:"border-box",

    backgroundColor:"#ffffff",

  },



  button: {

    background:"#2563eb",

    color:"#ffffff",

    padding:"14px",

    border:"none",

    borderRadius:"8px",

    cursor:"pointer",

    fontSize:"17px",

    fontWeight:"bold",

    marginTop:"10px",

  },



  secondaryButton: {

    background:"#059669",

    color:"#ffffff",

    padding:"12px",

    border:"none",

    borderRadius:"8px",

    cursor:"pointer",

    fontSize:"15px",

    fontWeight:"bold",

  },



  publicationBox: {

    background:"#f9fafb",

    padding:"20px",

    borderRadius:"10px",

    border:"1px solid #e5e7eb",

    display:"grid",

    gap:"12px",

  },


};