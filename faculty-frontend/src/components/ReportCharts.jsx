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



export default function ReportCharts({stats}) {



  const publicationsData =
    Object.entries(
      stats?.publicationsByYear || {}
    ).map(([year,value])=>({

      year,
      publications:value

    }));





  const rankData =
    Object.entries(
      stats?.facultyByRank || {}
    ).map(([name,value])=>({

      name,
      value

    }));





  const qualificationData =
    Object.entries(
      stats?.facultyByQualification || {}
    ).map(([name,value])=>({

      name,
      value

    }));





  const genderData =
    Object.entries(
      stats?.facultyByGender || {}
    ).map(([name,value])=>({

      name,
      value

    }));





  const authorData =
    (stats?.topPublishedAuthors || [])
    .map(item=>({

      name:item.name,
      publications:item.publications

    }));





  const colors=[

    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#8b5cf6",
    "#06b6d4"

  ];





return(


<div style={styles.grid}>


{/* ===========================
 PUBLICATIONS
=========================== */}


<div style={styles.card}>


<h2>

📚 Publications By Year

</h2>


<ResponsiveContainer
width="100%"
height={300}
>


<BarChart
data={publicationsData}
>


<CartesianGrid
strokeDasharray="3 3"
/>


<XAxis
dataKey="year"
/>


<YAxis/>


<Tooltip/>


<Bar
dataKey="publications"
fill="#2563eb"
/>


</BarChart>


</ResponsiveContainer>


</div>








{/* ===========================
 RANK
=========================== */}


<div style={styles.card}>


<h2>

👨‍🏫 Academic Rank

</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<BarChart
data={rankData}
>


<CartesianGrid
strokeDasharray="3 3"
/>


<XAxis
dataKey="name"
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








{/* ===========================
 QUALIFICATION
=========================== */}


<div style={styles.card}>


<h2>

🎓 Qualification

</h2>



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

fill={
colors[index % colors.length]
}

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









{/* ===========================
 GENDER
=========================== */}


<div style={styles.card}>


<h2>

🚻 Gender Distribution

</h2>



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

fill={
colors[index % colors.length]
}

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









{/* ===========================
 TOP AUTHORS
=========================== */}


<div style={styles.card}>


<h2>

🏆 Top Published Authors

</h2>



<ResponsiveContainer
width="100%"
height={300}
>


<BarChart

data={authorData}

layout="vertical"

>


<CartesianGrid
strokeDasharray="3 3"
/>


<XAxis
type="number"
/>


<YAxis

dataKey="name"

type="category"

/>


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

gap:"25px",

marginTop:"30px"

},



card:{


background:"#fff",

padding:"20px",

borderRadius:"12px",

boxShadow:
"0 5px 15px rgba(0,0,0,.1)"


}


};