import React, {
  useEffect,
  useState
} from "react";


import {
  getReportSummary,
  getStatisticsReport
}
from "../services/reportService";


import ReportCharts from "../components/ReportCharts";

import { exportCSV } from "../utils/exportCSV";



export default function Reports(){


  const [summary,setSummary] =
    useState(null);


  const [stats,setStats] =
    useState(null);


  const [loading,setLoading] =
    useState(true);


  const [error,setError] =
    useState("");





  useEffect(()=>{

    loadReports();

  },[]);






  const loadReports = async()=>{


    try{


      setLoading(true);


      const summaryResponse =
        await getReportSummary();



      const statsResponse =
       await getStatisticsReport();
        console.log("REPORT DATA:", statsResponse);




      setSummary(summaryResponse);


      setStats(statsResponse);



    }
    catch(err){


      console.error(
        "Reports Error:",
        err
      );


      setError(
        "Unable to load reports"
      );


    }
    finally{


      setLoading(false);


    }


  };







  if(loading){


    return(

      <div style={styles.loading}>

        Loading Reports...

      </div>

    );


  }






  if(error){


    return(

      <div style={styles.error}>

        {error}

      </div>

    );


  }







  return(


    <div>


      <h1 style={styles.title}>

        📑 Faculty Reports

      </h1>

<button
  onClick={() =>
    exportCSV(
      [
        {
          Report: "Faculty Summary",
          TotalFaculty: stats?.faculty || 0,
          TotalUsers: stats?.users || 0,
          TotalPublications: stats?.totalPublications || 0,
          ActiveFaculty: stats?.activeFaculty || 0
        }
      ],
      "faculty_report.csv"
    )
  }
  style={styles.exportButton}
>
  ⬇ Download CSV
</button>

<button

  onClick={() => window.print()}

  style={styles.printButton}

>
  🖨 Print Report
</button>


      <p style={styles.subtitle}>

        Faculty Management Information System Analytics

      </p>







      {/* ============================
          SUMMARY CARDS
      ============================ */}



      <div style={styles.grid}>


        <ReportCard

          title="Total Faculty"

          value={
            stats?.faculty || 0
          }

        />



        <ReportCard

          title="Total Users"

          value={
            stats?.users || 0
          }

        />



        <ReportCard

          title="Total Publications"

          value={
            stats?.totalPublications || 0
          }

        />



        <ReportCard

          title="Active Faculty"

          value={
            stats?.activeFaculty || 0
          }

        />


      </div>










      {/* ============================
          CHARTS
      ============================ */}



      <section style={styles.section}>


        <h2>

          📊 Statistical Charts

        </h2>



        {
          stats &&

          <ReportCharts

            stats={stats}

          />

        }



      </section>









      {/* ============================
          PUBLICATION SUMMARY
      ============================ */}



      <ReportSection

        title="📚 Publications By Year"

        data={
          stats?.publicationsByYear
        }

      />









      {/* ============================
          TOP AUTHORS
      ============================ */}



      <ReportSection

        title="🏆 Top Published Authors"

        data={

          stats?.topPublishedAuthors?.reduce(

            (obj,item)=>{


              obj[item.name] =
                item.publications;


              return obj;


            },{}

          )

        }

      />









      {/* ============================
          FACULTY INFORMATION
      ============================ */}



      <ReportSection

        title="👨‍🏫 Academic Rank"

        data={
          stats?.facultyByRank
        }

      />




      <ReportSection

        title="🎓 Qualification"

        data={
          stats?.facultyByQualification
        }

      />




      <ReportSection

        title="🚻 Gender"

        data={
          stats?.facultyByGender
        }

      />




      <ReportSection

        title="🌍 Country"

        data={
          stats?.facultyByCountry
        }

      />





    </div>


  );


}









// =================================
// SUMMARY CARD
// =================================


function ReportCard({

title,

value

}){


return(


<div style={styles.card}>


<h3>

{title}

</h3>



<h1>

{value}

</h1>



</div>


);


}









// =================================
// REPORT SECTION
// =================================


function ReportSection({

title,

data

}){


return(


<section style={styles.section}>


<h2>

{title}

</h2>





{

data &&

Object.entries(data).map(

([key,value])=>(


<div

key={key}

style={styles.row}

>


<span>

{key}

</span>



<strong>

{value}

</strong>



</div>


)


)


}



</section>


);


}











// =================================
// STYLES
// =================================


const styles={



loading:{


height:"70vh",

display:"flex",

justifyContent:"center",

alignItems:"center",

fontSize:"22px",

fontWeight:"bold"

},





error:{


padding:"30px",

background:"#fee2e2",

color:"#991b1b",

borderRadius:"10px"

},






title:{


color:"#0f172a",

marginBottom:"5px"


},






subtitle:{


color:"#64748b",

marginBottom:"30px"


},






grid:{


display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",

gap:"20px"


},







card:{


background:"#ffffff",

padding:"25px",

borderRadius:"12px",

boxShadow:
"0 5px 15px rgba(0,0,0,0.1)",

textAlign:"center"


},








section:{


marginTop:"30px",

background:"#ffffff",

padding:"25px",

borderRadius:"12px",

boxShadow:
"0 5px 15px rgba(0,0,0,0.1)"


},







row:{


display:"flex",

justifyContent:"space-between",

padding:"12px 0",

borderBottom:
"1px solid #e2e8f0"


}



};