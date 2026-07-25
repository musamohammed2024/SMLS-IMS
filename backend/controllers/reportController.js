  const Faculty = require("../models/Faculty");
const User = require("../models/User");

// ======================================
// GET REPORT SUMMARY
// ======================================

const getReportSummary = async (req, res) => {
  try {


    // ===============================
    // FACULTY STATISTICS
    // ===============================


    const totalFaculty =
      await Faculty.countDocuments();

    const activeFaculty =
  await Faculty.countDocuments({
    currentStatus: "Active"
  });



    const onLeave =
      await Faculty.countDocuments({

        currentStatus: "On Leave"

      });



    const retired =
      await Faculty.countDocuments({

        currentStatus: "Retired"

      });






    // ===============================
    // USER STATISTICS
    // ===============================


    const totalUsers =
      await User.countDocuments();



    const admins =
      await User.countDocuments({

        role: "admin"

      });



    const staff =
      await User.countDocuments({

        role: "staff"

      });



    const viewers =
      await User.countDocuments({

        role: "viewer"

      });






    // ===============================
    // ACADEMIC RANK REPORT
    // ===============================


    const academicRanks =
      await Faculty.aggregate([


        {

          $project: {

            academicRank: {

              $trim: {

                input: {

                  $ifNull: [

                    "$academicRank",

                    ""

                  ]

                }

              }

            }

          }

        },



        {

          $group: {

            _id: "$academicRank",

            count: {

              $sum: 1

            }

          }

        },



        {

          $sort: {

            _id: 1

          }

        }


      ]);






    // ===============================
    // GENDER REPORT
    // ===============================


    const gender =
      await Faculty.aggregate([


        {

          $project: {

            gender: {

              $trim: {

                input: {

                  $ifNull: [

                    "$gender",

                    "Unknown"

                  ]

                }

              }

            }

          }

        },



        {

          $group: {

            _id: "$gender",

            count: {

              $sum: 1

            }

          }

        },



        {

          $sort: {

            _id: 1

          }

        }


      ]);








    // ===============================
    // PUBLICATION REPORT
    // ===============================

    // Average publications
const publicationData =
      await Faculty.aggregate([


        {

          $group: {

            _id: null,

            total: {

              $sum: {

                $ifNull: [

                  "$totalPublications", 

                  0

                ]

              }

            }

          }

        }


      ]);

    const averagePublications =
  totalFaculty > 0
    ? (
        publicationData.length > 0
          ? publicationData[0].total / totalFaculty
          : 0
      ).toFixed(1)
    : 0;


// Highest published researcher
const highestPublisher =
  await Faculty.findOne()
    .sort({ totalPublications: -1 })
    .select("fullName totalPublications");


// Lowest published researcher
const lowestPublisher =
  await Faculty.findOne()
    .sort({ totalPublications: 1 })
    .select("fullName totalPublications");


// Average service year
const serviceData =
  await Faculty.aggregate([
    {
      $group: {
        _id: null,
        averageService: {
          $avg: "$serviceYear"
        }
      }
    }
  ]);

const averageServiceYear =
  serviceData.length > 0
    ? serviceData[0].averageService.toFixed(1)
    : 0;


// Qualification report
const qualifications =
  await Faculty.aggregate([
    {
      $group: {
        _id: "$qualification",
        count: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);


// Country report
const countries =
  await Faculty.aggregate([
    {
      $group: {
        _id: "$country",
        count: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);


// Top 10 researchers
const topResearchers =
  await Faculty.find()
    .sort({ totalPublications: -1 })
    .limit(10)
    .select("fullName totalPublications");


    








    // ===============================
    // RESPONSE
    // ===============================


    res.status(200).json({


      success:true,



      faculty:{


        total: totalFaculty,


        active: activeFaculty,


        onLeave: onLeave,


        retired: retired


      },




      users:{


        total: totalUsers,


        admins: admins,


        staff: staff,


        viewers: viewers


      },




      academicRanks,




      gender,




      publications:
  publicationData.length > 0
    ? publicationData[0].total
    : 0,

averagePublications,
averageServiceYear,
highestPublisher,
lowestPublisher,
qualifications,
countries,
topResearchers

    });





  }

  catch(error){


    console.error(

      "REPORT ERROR:",

      error.message

    );



    res.status(500).json({


      success:false,


      message:

        "Report generation failed"


    });


  }

};





module.exports = {

  getReportSummary

};