import React from "react";


export default function FacultySummary({

  faculty

}) {


const totalFaculty = faculty.length;


const activeFaculty = faculty.filter(

(item)=>

item.currentStatus === "Active"

).length;



const onLeaveFaculty = faculty.filter(

(item)=>

item.currentStatus === "On Leave"

).length;



const retiredFaculty = faculty.filter(

(item)=>

item.currentStatus === "Retired"

).length;



const totalPublications = faculty.reduce(
  (total, item) =>
    total +
    Number(
      item.totalPublications ??
      item.numberOfPublications ??
      0
    ),
  0
);

return (

<div style={styles.container}>


<Card

title="Total Faculty"

value={totalFaculty}

icon="👨‍🏫"

/>



<Card

title="Active"

value={activeFaculty}

icon="✅"

/>



<Card

title="On Leave"

value={onLeaveFaculty}

icon="🏖️"

/>



<Card

title="Retired"

value={retiredFaculty}

icon="📚"

/>



<Card

title="Publications"

value={totalPublications}

icon="📖"

/>



</div>

);

}






function Card({

title,

value,

icon

}){


return (

<div style={styles.card}>


<div style={styles.icon}>

{icon}

</div>


<div>

<h2 style={styles.value}>

{value}

</h2>


<p style={styles.title}>

{title}

</p>


</div>


</div>

);

}






const styles={


container:{

display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(180px,1fr))",

gap:"20px",

marginBottom:"25px"

},



card:{

background:"#ffffff",

padding:"20px",

borderRadius:"12px",

display:"flex",

alignItems:"center",

gap:"15px",

boxShadow:

"0 5px 15px rgba(0,0,0,.08)"

},



icon:{

fontSize:"35px"

},



value:{

margin:0,

fontSize:"28px",

color:"#0f172a"

},



title:{

margin:0,

marginTop:"5px",

color:"#64748b",

fontSize:"14px"

}


};