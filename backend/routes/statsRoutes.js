const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Faculty = require("../models/Faculty");


// ==========================================
// GET DASHBOARD & REPORT STATISTICS
// ==========================================

router.get("/", async (req, res) => {

  console.log("NEW STATS ROUTE LOADED");


  try {


    // =====================================
    // BASIC COUNTS
    // =====================================

    const users = await User.countDocuments();

    const faculty = await Faculty.countDocuments();


    const activeFaculty = await Faculty.countDocuments({
      currentStatus: "Active",
    });


    const studyLeaveFaculty = await Faculty.countDocuments({
  currentStatus: "Study Leave",
});

const sabbaticalLeaveFaculty = await Faculty.countDocuments({
  currentStatus: "Sabbatical Leave",
});

const retiredFaculty = await Faculty.countDocuments({
  currentStatus: "Retired",
});

const resignedFaculty = await Faculty.countDocuments({
  currentStatus: "Resigned",
});

const deceasedFaculty = await Faculty.countDocuments({
  currentStatus: "Deceased",
});


    const inactiveFaculty = await Faculty.countDocuments({
      currentStatus: "Inactive",
    });



    // =====================================
    // LOAD FACULTY DATA
    // =====================================

    const facultyList = await Faculty.find();


    console.log("Faculty records:", facultyList.length);



    // =====================================
    // VARIABLES
    // =====================================


    let totalPublications = 0;


    const publicationsByYear = {};

    const publicationsByAuthor = [];


    const facultyByRank = {};

    const facultyByQualification = {};

    const facultyByGender = {};

    const facultyByCountry = {};

    const facultyBySpecialization = {};

    const serviceYearDistribution = {};

    const semesterLoadDistribution = {};





    // =====================================
    // PROCESS FACULTY
    // =====================================


    facultyList.forEach((person)=>{


      // -------------------------------
      // PUBLICATIONS
      // -------------------------------


      const publications =
  Number(person.totalPublications || 0);

console.log(
  person.fullName,
  "Publications:",
  publications
);



      totalPublications += publications;



      publicationsByAuthor.push({

        name:
          person.title && person.title !== ""
          ?
          `${person.title} ${person.fullName}`
          :
          person.fullName,


        publications

      });





      // -------------------------------
      // PUBLICATIONS BY YEAR
      // -------------------------------


      if(person.publicationsByYear){


        const yearData =
          person.publicationsByYear instanceof Map
          ?
          Object.fromEntries(person.publicationsByYear)
          :
          person.publicationsByYear;



        Object.entries(yearData).forEach(
          ([year,count])=>{


            publicationsByYear[year] =
              (publicationsByYear[year] || 0)
              +
              Number(count);



          }
        );


      }






      // -------------------------------
      // RANK
      // -------------------------------


      const rank =
        person.academicRank || "Not Specified";


      facultyByRank[rank] =
        (facultyByRank[rank] || 0) + 1;






      // -------------------------------
      // QUALIFICATION
      // -------------------------------


      const qualification =
        person.qualification || "Not Specified";


      facultyByQualification[qualification] =
        (facultyByQualification[qualification] || 0) + 1;







      // -------------------------------
      // GENDER
      // -------------------------------


      const gender =
        person.gender || "Not Specified";


      facultyByGender[gender] =
        (facultyByGender[gender] || 0) + 1;







      // -------------------------------
      // COUNTRY
      // -------------------------------


      const country =
        person.country || "Unknown";


      facultyByCountry[country] =
        (facultyByCountry[country] || 0) + 1;








      // -------------------------------
      // SPECIALIZATION
      // -------------------------------


      const specialization =
        person.fieldOfSpecialization ||
        "Not Specified";


      facultyBySpecialization[specialization] =
        (facultyBySpecialization[specialization] || 0) + 1;








      // -------------------------------
      // SERVICE YEAR
      // -------------------------------


      const years =
        Number(person.serviceYear) || 0;



      let serviceGroup;



      if(years <= 5)
        serviceGroup="0–5 Years";

      else if(years <=10)
        serviceGroup="6–10 Years";

      else if(years <=20)
        serviceGroup="11–20 Years";

      else
        serviceGroup="20+ Years";



      serviceYearDistribution[serviceGroup] =
        (serviceYearDistribution[serviceGroup] || 0)
        +
        1;







      // -------------------------------
      // SEMESTER LOAD
      // -------------------------------


      const load =
        Number(person.semesterLoad) || 0;



      let loadGroup;



      if(load <=6)
        loadGroup="0–6";

      else if(load <=12)
        loadGroup="7–12";

      else if(load <=18)
        loadGroup="13–18";

      else
        loadGroup="19+";



      semesterLoadDistribution[loadGroup] =
        (semesterLoadDistribution[loadGroup] || 0)
        +
        1;



    });







    // =====================================
    // TOP AUTHORS
    // =====================================


    publicationsByAuthor.sort(
      (a,b)=>
      b.publications - a.publications
    );



    const topPublishedAuthors =
      publicationsByAuthor.slice(0,10);







    // =====================================
    // SORT YEAR DATA
    // =====================================


    const sortedPublicationsByYear={};



    Object.keys(publicationsByYear)
    .sort(
      (a,b)=>Number(a)-Number(b)
    )
    .forEach(year=>{


      sortedPublicationsByYear[year] =
        publicationsByYear[year];


    });







    // =====================================
    // SEND RESPONSE
    // =====================================


    res.json({

      success:true,


      users,


      faculty,


      totalPublications,



      activeFaculty,
studyLeaveFaculty,
sabbaticalLeaveFaculty,
retiredFaculty,
resignedFaculty,
deceasedFaculty,



      publicationsByYear:
        sortedPublicationsByYear,


      publicationsByAuthor,


      topPublishedAuthors,



      facultyByRank,


      facultyByQualification,


      facultyByGender,


      facultyByCountry,


      facultyBySpecialization,


      serviceYearDistribution,


      semesterLoadDistribution


    });



  } catch(error){



    console.error(
      "Statistics Error:",
      error
    );



    res.status(500).json({

      success:false,

      message:
      "Error fetching dashboard statistics",

      error:error.message

    });


  }


});



module.exports = router;