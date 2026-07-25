import FacultyTable from "../components/FacultyTable";
import FacultySummary from "../components/FacultySummary";

import React, {
  useEffect,
  useState
} from "react";

import {
  getFaculty,
  deleteFaculty
} from "../services/facultyService";

import { useNavigate } from "react-router-dom";

import { getUserRole } from "../utils/auth";





export default function Faculty(){


const navigate = useNavigate();

const role = getUserRole();

const isAdmin = role === "admin";



const [faculty,setFaculty] = useState([]);

const [loading,setLoading] = useState(true);

const [search,setSearch] = useState("");
const [rankFilter,setRankFilter] = useState("");


const [genderFilter,setGenderFilter] = useState("");

const [statusFilter,setStatusFilter] = useState("");

const [countryFilter,setCountryFilter] = useState("");






useEffect(()=>{

loadFaculty();

},[]);







const loadFaculty = async()=>{


try{


const data = await getFaculty();


setFaculty(data);



}

catch(error){


console.error(

"Faculty loading error:",

error

);


}

finally{


setLoading(false);


}


};






const filteredFaculty = faculty.filter((item)=>{


const text = search.toLowerCase();


return (

(
item.fullName
?.toLowerCase()
.includes(text)

||

item.email
?.toLowerCase()
.includes(text)

||

item.fieldOfSpecialization
?.toLowerCase()
.includes(text)

||

item.qualification
?.toLowerCase()
.includes(text)

||

item.academicRank
?.toLowerCase()
.includes(text)

)

&&

(
rankFilter === ""

||

item.academicRank === rankFilter

)

&&

(
genderFilter === ""

||

item.gender === genderFilter

)

&&

(
statusFilter === ""

||

item.currentStatus === statusFilter

)

&&

(
countryFilter === ""

||

item.country === countryFilter

)

);


});
const handleDelete = async(id)=>{


const confirmDelete =

window.confirm(

"Are you sure you want to delete this faculty member?"

);



if(!confirmDelete)

return;





try{


await deleteFaculty(id);


loadFaculty();



}

catch(error){


console.error(

"Delete error:",

error

);


}



};









if(loading){


return(

<div style={styles.loading}>

Loading Faculty Records...

</div>


);


}









return(


<div>


{/* ================= HEADER ================= */}


<div style={styles.header}>


<div>


<h1 style={styles.title}>

👨‍🏫 Faculty Management

</h1>



<p style={styles.subtitle}>

Faculty Information Database

</p>


</div>







{
isAdmin && (

<button

style={styles.addButton}

onClick={()=>navigate("/faculty/add")}

>

➕ Add Faculty

</button>

)
}


</div>





{/* ================= SUMMARY CARDS ================= */}

<FacultySummary

faculty={faculty}

/>



<input

type="text"

placeholder="🔍 Search faculty..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

style={styles.search}

/>
<div style={styles.filterRow}>


<select

value={rankFilter}

onChange={(e)=>setRankFilter(e.target.value)}

style={styles.filter}

>

<option value="">All Ranks</option>

<option>Lecturer</option>

<option>Assistant Professor</option>

<option>Associate Professor</option>

<option>Professor</option>

</select>





<select

value={genderFilter}

onChange={(e)=>setGenderFilter(e.target.value)}

style={styles.filter}

>

<option value="">All Gender</option>

<option>Male</option>

<option>Female</option>

<option>Other</option>

</select>





<select

value={statusFilter}

onChange={(e)=>setStatusFilter(e.target.value)}

style={styles.filter}

>

<option value="">All Status</option>

<option>Active</option>

<option>On Leave</option>

<option>Retired</option>

<option>Inactive</option>

</select>





<select

value={countryFilter}

onChange={(e)=>setCountryFilter(e.target.value)}

style={styles.filter}

>

<option value="">All Countries</option>

<option>Ethiopia</option>

<option>Kenya</option>

<option>Uganda</option>

<option>Tanzania</option>

<option>Sudan</option>

<option>South Sudan</option>

<option>Djibouti</option>

<option>Eritrea</option>

<option>Somalia</option>

</select>


</div>
{/* ================= TABLE ================= */}


<FacultyTable

faculty={filteredFaculty}


onView={(id)=>

navigate(`/faculty/profile/${id}`)

}


onEdit={

isAdmin

?

(id)=>navigate(`/faculty/edit/${id}`)

:

null

}


onDelete={

isAdmin

?

handleDelete

:

null

}

/>


</div>


);


}









const styles={





loading:{


height:"70vh",

display:"flex",

justifyContent:"center",

alignItems:"center",

fontSize:"22px",

fontWeight:"bold",

color:"#334155"


},





header:{


display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"25px",

flexWrap:"wrap",

gap:"15px"


},





title:{


margin:0,

color:"#0f172a",

fontSize:"28px"


},





subtitle:{


marginTop:"8px",

color:"#64748b"


},





addButton:{


background:"#2563eb",

color:"#ffffff",

border:"none",

padding:"12px 22px",

borderRadius:"8px",

fontSize:"16px",

cursor:"pointer",

fontWeight:"bold"


},


search:{
  
  width:"350px",

  padding:"12px 15px",

  border:"1px solid #cbd5e1",

  borderRadius:"8px",

  fontSize:"15px",

  marginBottom:"20px",

  outline:"none",

  boxSizing:"border-box"

},
filterRow:{

  display:"flex",

  gap:"15px",

  flexWrap:"wrap",

  marginBottom:"20px"

},



filter:{

  padding:"12px 15px",

  border:"1px solid #cbd5e1",

  borderRadius:"8px",

  fontSize:"14px",

  background:"#ffffff",

  minWidth:"180px",

  cursor:"pointer",

  outline:"none"

},
};

