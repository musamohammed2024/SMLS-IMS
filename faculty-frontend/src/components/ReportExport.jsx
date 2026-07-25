import React from "react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import * as XLSX from "xlsx";



export default function ReportExport({stats}) {



const exportPDF = ()=>{


const doc = new jsPDF();



doc.setFontSize(18);


doc.text(
"Faculty Management Information System Report",
20,
20
);



doc.setFontSize(12);


doc.text(
`Total Faculty: ${stats.faculty}`,
20,
35
);


doc.text(
`Total Publications: ${stats.totalPublications}`,
20,
45
);



const tableData = Object.entries(

stats.facultyByRank || {}

).map(([rank,count])=>[

rank,

count

]);





autoTable(doc,{

startY:60,

head:[

[
"Academic Rank",
"Number of Faculty"
]

],


body:tableData


});





doc.save(

"faculty-report.pdf"

);


};








const exportExcel = ()=>{


const worksheet = XLSX.utils.json_to_sheet([


{

"Total Faculty":
stats.faculty,


"Total Users":
stats.users,


"Total Publications":
stats.totalPublications,


"Active Faculty":
stats.activeFaculty


}


]);





const workbook =
XLSX.utils.book_new();



XLSX.utils.book_append_sheet(

workbook,

worksheet,

"Summary"

);





XLSX.writeFile(

workbook,

"faculty-report.xlsx"

);



};








const printReport = ()=>{


window.print();


};







return(


<div style={styles.container}>


<button

style={styles.pdf}

onClick={exportPDF}

>

📄 Export PDF

</button>




<button

style={styles.excel}

onClick={exportExcel}

>

📊 Export Excel

</button>




<button

style={styles.print}

onClick={printReport}

>

🖨 Print

</button>



</div>


);


}







const styles={


container:{


display:"flex",

gap:"15px",

marginTop:"25px",

flexWrap:"wrap"


},




pdf:{


background:"#dc2626",

color:"#fff",

border:"none",

padding:"12px 20px",

borderRadius:"8px",

cursor:"pointer"

},




excel:{


background:"#16a34a",

color:"#fff",

border:"none",

padding:"12px 20px",

borderRadius:"8px",

cursor:"pointer"

},




print:{


background:"#2563eb",

color:"#fff",

border:"none",

padding:"12px 20px",

borderRadius:"8px",

cursor:"pointer"

}



};