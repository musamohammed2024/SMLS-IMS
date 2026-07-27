import React, { useState } from "react";
import countryList from "react-select-country-list";
import { countries as countryData } from "country-data";

const countryOptions = countryList().getData();


function FacultyModal({
  show,
  editMode,
  form = {},
  handleChange,
  handlePublicationChange,
  onClose,
  onSubmit,
}) {


  const [otherQualification, setOtherQualification] = useState("");
  const [otherSpecialization, setOtherSpecialization] = useState("");
  const [otherRank, setOtherRank] = useState("");
  const [otherPosition, setOtherPosition] = useState("");


  if (!show) return null;



  // ==========================
  // COUNTRY CHANGE
  // ==========================

  const handleCountryChange = (e) => {

    const countryName = e.target.value;


    const country = Object.values(countryData.all)
      .find(
        (c) => c.name === countryName
      );


    const callingCode =
      country &&
      country.countryCallingCodes.length > 0
        ? country.countryCallingCodes[0]
            .replace(/\s/g,"")
        : "";


    handleChange({
      target:{
        name:"country",
        value:countryName
      }
    });


    handleChange({
      target:{
        name:"countryCode",
        value:callingCode
      }
    });

  };



  // ==========================
  // PHONE NUMBER
  // ==========================

  const handleTelephoneChange = (e)=>{

    const value =
      e.target.value.replace(/\D/g,"");


    handleChange({
      target:{
        name:"telephone",
        value:value
      }
    });

  };



  // ==========================
  // SAVE WITH OTHER VALUES
  // ==========================

  const handleFormSubmit = (e)=>{

    e.preventDefault();


    if(form.qualification === "Other"){
      handleChange({
        target:{
          name:"qualification",
          value:otherQualification
        }
      });
    }


    if(form.fieldOfSpecialization === "Other"){
      handleChange({
        target:{
          name:"fieldOfSpecialization",
          value:otherSpecialization
        }
      });
    }


    if(form.academicRank === "Other"){
      handleChange({
        target:{
          name:"academicRank",
          value:otherRank
        }
      });
    }


    if(form.currentPosition === "Other"){
      handleChange({
        target:{
          name:"currentPosition",
          value:otherPosition
        }
      });
    }


    onSubmit(e);

  };



  return (

    <div style={overlay}>

      <div style={modal}>


        <h2 style={title}>
          {editMode
            ? "Edit Faculty"
            : "Add New Faculty"}
        </h2>


        <form onSubmit={handleFormSubmit}>


          <div style={grid}>
{/* ================= TITLE ================= */}

<div>

<label style={label}>
Title
</label>


<select
name="title"
value={form.title || ""}
onChange={handleChange}
style={input}
>

<option value="">
Select Title
</option>

<option value="Prof.">
Prof.
</option>

<option value="Dr.">
Dr.
</option>

</select>

</div>



{/* ================= FULL NAME ================= */}

<div>

<label style={label}>
Full Name
</label>


<input
type="text"
name="fullName"
value={form.fullName || ""}
onChange={handleChange}
style={input}
required
/>

</div>




{/* ================= GENDER ================= */}

<div>

<label style={label}>
Gender
</label>


<select
name="gender"
value={form.gender || ""}
onChange={handleChange}
style={input}
>


<option value="">
Select Gender
</option>


<option value="Male">
Male
</option>


<option value="Female">
Female
</option>


</select>

</div>





{/* ================= QUALIFICATION ================= */}

<div>

<label style={label}>
Qualification
</label>


<select
name="qualification"
value={form.qualification || ""}
onChange={handleChange}
style={input}
required
>


<option value="">
Select Qualification
</option>


<option value="Post Doc">
Post Doc
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


<option value="Certificate">
Certificate
</option>


<option value="Other">
Other
</option>


</select>



{form.qualification === "Other" && (

<input
type="text"
placeholder="Specify qualification"
value={otherQualification}
onChange={(e)=>
setOtherQualification(e.target.value)
}
style={input}
/>

)}


</div>





{/* ================= SPECIALIZATION ================= */}

<div>

<label style={label}>
Field of Specialization
</label>


<select
name="fieldOfSpecialization"
value={form.fieldOfSpecialization || ""}
onChange={handleChange}
style={input}
>


<option value="">
Select Specialization
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



{form.fieldOfSpecialization === "Other" && (

<input
type="text"
placeholder="Specify specialization"
value={otherSpecialization}
onChange={(e)=>
setOtherSpecialization(e.target.value)
}
style={input}
/>

)}


</div>

{/* ================= ACADEMIC RANK ================= */}

<div>

<label style={label}>
Academic Rank
</label>


<select
name="academicRank"
value={form.academicRank || ""}
onChange={handleChange}
style={input}
>


<option value="">
Select Academic Rank
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



{form.academicRank === "Other" && (

<input
type="text"
placeholder="Specify academic rank"
value={otherRank}
onChange={(e)=>
setOtherRank(e.target.value)
}
style={input}
/>

)}


</div>





{/* ================= CURRENT POSITION ================= */}

<div>

<label style={label}>
Current Position
</label>


<select
name="currentPosition"
value={form.currentPosition || ""}
onChange={handleChange}
style={input}
>


<option value="">
Select Current Position
</option>


<option value="School Head">
School Head
</option>


<option value="School Level Coordinator">
School Level Coordinator
</option>


<option value="College Level Coordinator">
College Level Coordinator
</option>


<option value="Other">
Other
</option>


</select>



{form.currentPosition === "Other" && (

<input
type="text"
placeholder="Specify position"
value={otherPosition}
onChange={(e)=>
setOtherPosition(e.target.value)
}
style={input}
/>

)}


</div>





{/* ================= SEMESTER LOAD ================= */}

<div>

<label style={label}>
Semester Load
</label>


<input
type="number"
name="semesterLoad"
value={form.semesterLoad || ""}
onChange={handleChange}
min="0"
style={input}
/>


</div>





{/* ================= YEARS OF SERVICE ================= */}

<div>

<label style={label}>
Years of Service
</label>


<input
type="number"
name="serviceYear"
value={form.serviceYear || ""}
onChange={handleChange}
min="0"
style={input}
/>


</div>





{/* ================= PUBLICATIONS ================= */}

<div>

<label style={label}>
Number of Publications
</label>


<input
type="number"
name="numberOfPublications"
value={form.numberOfPublications || ""}
onChange={handleChange}
min="0"
style={input}
/>


</div>





{/* ================= PUBLICATION HISTORY ================= */}

<div style={{gridColumn:"1 / span 2"}}>

<label style={label}>
Publications Per Year (2010-2026)
</label>


<div
style={{
display:"grid",
gridTemplateColumns:
"repeat(auto-fit,minmax(90px,1fr))",
gap:"10px"
}}
>


{
Array.from(
{length:17},
(_,i)=>2010+i
).map((year)=>(


<div key={year}>


<label
style={{
...label,
fontSize:"12px",
textAlign:"center"
}}
>
{year}
</label>


<input
type="number"
min="0"
value={
form.publicationsByYear?.[year] ?? 0
}
onChange={(e)=>
handlePublicationChange(
year,
e.target.value
)
}
style={{
...input,
textAlign:"center"
}}
/>


</div>


))
}


</div>


</div>

{/* ================= COUNTRY ================= */}

<div>

<label style={label}>
Country
</label>


<select

name="country"

value={form.country || ""}

onChange={handleCountryChange}

style={input}

>


<option value="">
Select Country
</option>


{
countryOptions.map((country)=>(

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





{/* ================= TELEPHONE ================= */}

<div>

<label style={label}>
Telephone Number
</label>


<div style={phoneBox}>


<span style={countryCodeDisplay}>

{form.countryCode || "+251"}

</span>



<input

type="text"

name="telephone"

value={form.telephone || ""}

onChange={handleTelephoneChange}

placeholder="912345678"

style={phoneInput}

/>


</div>


</div>





{/* ================= EMAIL ================= */}

<div>

<label style={label}>
Email Address
</label>


<input

type="email"

name="email"

value={form.email || ""}

onChange={handleChange}

style={input}

/>


</div>





{/* ================= ORCID ================= */}

<div>

<label style={label}>
ORCID
</label>


<input

type="text"

name="orcid"

value={form.orcid || ""}

onChange={handleChange}

style={input}

/>


</div>


{/* ================= PHOTO ================= */}

<div>

<label style={label}>
Faculty Photo
</label>


<input

type="file"

name="photo"

accept="image/*"

onChange={handleChange}

style={input}

/>



{
form.photo && (

<div
style={{
marginTop:"10px",
display:"flex",
alignItems:"center",
gap:"15px"
}}
>


{

form.photo && (

<img

src={
  form.photo instanceof File
    ? URL.createObjectURL(form.photo)
    : form.photo
}

alt="Faculty"

style={{

width:"60px",

height:"60px",

borderRadius:"50%",

objectFit:"cover"

}}

/>

)

}


<button
type="button"
onClick={()=>{

handleChange({
  target: {
    name: "photo",
    files: null
  }
});


}}
style={{
background:"#dc2626",
color:"#fff",
border:"none",
padding:"8px 15px",
borderRadius:"6px",
cursor:"pointer"
}}
>

Remove Photo

</button>


</div>

)

}


</div>


{/* ================= STATUS ================= */}

<div>

<label style={label}>
Current Status
</label>


<select

name="currentStatus"

value={form.currentStatus || "Active"}

onChange={handleChange}

style={input}

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

<div style={buttons}>


<button
type="submit"
style={saveBtn}
>

{
editMode
? "Update Faculty"
: "Save Faculty"
}

</button>



<button

type="button"

onClick={onClose}

style={cancelBtn}

>

Cancel

</button>


</div>



</form>


</div>

</div>


);

}



// ==========================================
// STYLES
// ==========================================


const overlay = {

position:"fixed",

inset:0,

background:"rgba(0,0,0,0.45)",

display:"flex",

justifyContent:"center",

alignItems:"center",

zIndex:1000,

};



const modal = {

background:"#ffffff",

width:"900px",

maxWidth:"95%",

maxHeight:"90vh",

overflowY:"auto",

borderRadius:"12px",

padding:"30px",

boxShadow:"0 10px 25px rgba(0,0,0,0.15)",

};



const title = {

textAlign:"center",

marginBottom:"20px",

color:"#1e293b",

};



const grid = {

display:"grid",

gridTemplateColumns:"repeat(2,1fr)",

gap:"18px",

};



const label = {

display:"block",

marginBottom:"6px",

fontWeight:"600",

color:"#334155",

};



const input = {

width:"100%",

padding:"10px",

border:"1px solid #cbd5e1",

borderRadius:"6px",

boxSizing:"border-box",

};



const phoneBox = {

display:"flex",

alignItems:"center",

border:"1px solid #cbd5e1",

borderRadius:"6px",

};



const countryCodeDisplay = {

padding:"10px",

background:"#f1f5f9",

borderRight:"1px solid #cbd5e1",

};



const phoneInput = {

flex:1,

padding:"10px",

border:"none",

outline:"none",

};



const buttons = {

marginTop:"25px",

display:"flex",

justifyContent:"flex-end",

gap:"12px",

};



const saveBtn = {

background:"#2563eb",

color:"#fff",

border:"none",

padding:"12px 22px",

borderRadius:"6px",

cursor:"pointer",

};



const cancelBtn = {

background:"#64748b",

color:"#fff",

border:"none",

padding:"12px 22px",

borderRadius:"6px",

cursor:"pointer",

};



export default FacultyModal;