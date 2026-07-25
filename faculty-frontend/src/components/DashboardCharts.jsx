import React from "react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";



export default function DashboardCharts({stats}) {



  // ===============================
  // PUBLICATIONS BY YEAR
  // ===============================

  const publicationData =
    Object.entries(
      stats.publicationsByYear || {}
    ).map(([year,value])=>({

      year,

      publications:value

    }));




  // ===============================
  // FACULTY STATUS
  // ===============================


  const statusData = [
  {
    name: "Active",
    value: stats.activeFaculty || 0
  },
  {
    name: "Study Leave",
    value: stats.studyLeaveFaculty || 0
  },
  {
    name: "Sabbatical Leave",
    value: stats.sabbaticalLeaveFaculty || 0
  },
  {
    name: "Retired",
    value: stats.retiredFaculty || 0
  },
  {
    name: "Resigned",
    value: stats.resignedFaculty || 0
  },
  {
    name: "Deceased",
    value: stats.deceasedFaculty || 0
  }
];





  // ===============================
  // ACADEMIC RANK
  // ===============================


  const rankData =

    Object.entries(
      stats.facultyByRank || {}
    )
    .map(([name,value])=>({

      name,

      value

    }));







  // ===============================
  // QUALIFICATION
  // ===============================


  const qualificationData =

    Object.entries(
      stats.facultyByQualification || {}
    )
    .map(([name,value])=>({

      name,

      value

    }));







  // ===============================
  // GENDER
  // ===============================


  const genderData =

    Object.entries(
      stats.facultyByGender || {}
    )
    .map(([name,value])=>({

      name,

      value

    }));






  // ===============================
  // TOP AUTHORS
  // ===============================


  const authorData =

    stats.topPublishedAuthors || [];







  const colors=[

    "#2563eb",

    "#16a34a",

    "#f59e0b",

    "#dc2626",

    "#8b5cf6",

    "#06b6d4"

  ];






return (


<div style={styles.grid}>


{/* =========================
PUBLICATIONS
========================= */}


<div style={styles.card}>


<h3>

📚 Publications By Year

</h3>



<ResponsiveContainer

width="100%"

height={300}

>


<BarChart data={publicationData}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="year"/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="publications"

fill="#2563eb"

/>


</BarChart>


</ResponsiveContainer>



</div>








{/* =========================
FACULTY STATUS
========================= */}


<div style={styles.card}>


<h3>

👨‍🏫 Faculty Status

</h3>


<ResponsiveContainer

width="100%"

height={300}

>


<PieChart>


<Pie

data={statusData}

dataKey="value"

nameKey="name"

outerRadius={100}

label

>


{

statusData.map(

(entry,index)=>(


<Cell

key={index}

fill={colors[index]}

/>


)

)

}



</Pie>



<Tooltip/>

<Legend/>


</PieChart>



</ResponsiveContainer>


</div>









{/* =========================
ACADEMIC RANK
========================= */}


<div style={styles.card}>


<h3>

🎓 Academic Rank

</h3>



<ResponsiveContainer

width="100%"

height={300}

>


<BarChart data={rankData}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis
  dataKey="name"
  interval={0}
  angle={-30}
  textAnchor="end"
  height={90}
  tick={{ fontSize: 15 }}
  tickFormatter={(value) =>
    value.length > 15 ? value.substring(0, 15) + "..." : value
  }
/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="value"

fill="#16a34a"

/>


</BarChart>


</ResponsiveContainer>


</div>









{/* =========================
QUALIFICATION
========================= */}


<div style={styles.card}>


<h3>

📖 Qualification

</h3>



<ResponsiveContainer

width="100%"

height={300}

>


<PieChart>


<Pie

data={qualificationData}

dataKey="value"

nameKey="name"

outerRadius={100}

label

>


{

qualificationData.map(

(entry,index)=>(


<Cell

key={index}

fill={colors[index]}

/>


)

)

}



</Pie>


<Tooltip/>

<Legend/>


</PieChart>



</ResponsiveContainer>


</div>









{/* =========================
GENDER
========================= */}


<div style={styles.card}>


<h3>

🚻 Gender Distribution

</h3>



<ResponsiveContainer

width="100%"

height={300}

>


<PieChart>


<Pie

data={genderData}

dataKey="value"

nameKey="name"

outerRadius={100}

label

>


{

genderData.map(

(entry,index)=>(


<Cell

key={index}

fill={colors[index]}

/>


)

)

}



</Pie>


<Tooltip/>

<Legend/>


</PieChart>



</ResponsiveContainer>


</div>









{/* =========================
TOP AUTHORS
========================= */}


<div style={styles.card}>


<h3>

🏆 Top Published Authors

</h3>



<ResponsiveContainer

width="100%"

height={300}

>


<BarChart
  data={authorData}
  margin={{
    top: 20,
    right: 20,
    left: 30,
    bottom: 40,
  }}
>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis
  dataKey="name"
  interval={0}
  angle={-30}
  textAnchor="end"
  height={90}
  tick={{ fontSize: 15} }
/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="publications"

fill="#8b5cf6"

/>


</BarChart>


</ResponsiveContainer>



</div>






</div>


);


}






const styles={



grid:{


display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(450px,1fr))",

gap:"25px"


},





card:{


background:"#ffffff",

borderRadius:"12px",

padding:"20px",

boxShadow:

"0 5px 15px rgba(0,0,0,.08)"


}



};