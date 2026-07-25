import React from "react";


export default function DashboardCards({stats}) {


  const cards = [


    {
      title:"👥 Users",
      value:stats.users || 0,
      color:"#2563eb"
    },


    {
      title:"👨‍🏫 Faculty",
      value:stats.faculty || 0,
      color:"#16a34a"
    },


    {
      title:"📚 Publications",
      value:stats.totalPublications || 0,
      color:"#9333ea"
    },


    {
      title:"🟢 Active Faculty",
      value:stats.activeFaculty || 0,
      color:"#059669"
    },


    {
      {
  title: "📚 Study Leave",
  value: stats.studyLeaveFaculty || 0,
  color: "#f59e0b"
},

{
  title: "🌍 Sabbatical Leave",
  value: stats.sabbaticalLeaveFaculty || 0,
  color: "#0ea5e9"
},

{
  title: "🔶 Resigned",
  value: stats.resignedFaculty || 0,
  color: "#f97316"
},

{
  title: "⚫ Deceased",
  value: stats.deceasedFaculty || 0,
  color: "#64748b"
}


  ];





  return (


    <div style={styles.grid}>


      {

      cards.map((card,index)=>(


        <div

          key={index}

          style={{
            ...styles.card,
            borderTop:
              `5px solid ${card.color}`
          }}

        >


          <h3>

            {card.title}

          </h3>


          <p

            style={{
              ...styles.value,
              color:card.color
            }}

          >

            {card.value}


          </p>


        </div>


      ))

      }


    </div>


  );


}






const styles={



grid:{


display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(200px,1fr))",

gap:"20px",

marginBottom:"30px"


},





card:{


background:"#ffffff",

padding:"20px",

borderRadius:"12px",

boxShadow:

"0 5px 15px rgba(0,0,0,.08)",

textAlign:"center"

},





value:{


fontSize:"36px",

fontWeight:"bold",

margin:"10px 0"


}



};