const Faculty = require("../models/Faculty");


// ===============================
// Dashboard Statistics
// ===============================
const getDashboardStats = async (req, res) => {

  try {

    const faculty = await Faculty.find();


    // ===============================
    // Total Faculty
    // ===============================

    const totalFaculty = faculty.length;



    // ===============================
    // Active Faculty
    // ===============================

    const activeFaculty = faculty.filter(
      (f) => f.currentStatus === "Active"
    ).length;



    // ===============================
    // Total Publications
    // From yearly publication records
    // ===============================

    const totalPublications = faculty.reduce(

      (total, f) => {


        let publications = 0;


        /*
          publicationsByYear example:

          {
            "2010": 10,
            "2011": 12,
            "2025": 8
          }

        */


        if (f.publicationsByYeary) {


          Object.values(
            f.publicationsByYear
          ).forEach((value) => {

            publications += Number(value) || 0;

          });


        }


        return total + publications;


      },

      0

    );



    res.json({

      success: true,

      totalFaculty,

      activeFaculty,

      totalPublications,

    });



  } catch (error) {


    console.error(
      "Dashboard statistics error:",
      error
    );


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};



module.exports = {

  getDashboardStats,

};