const Settings = require("../models/Settings");
const validator = require("validator");



// ===============================
// CHECK ACCESS
// ===============================

const checkAccess = (req, userId) => {

  return (
    req.user.role === "admin" ||
    req.user.id.toString() === userId.toString()
  );

};




// ===============================
// GET USER SETTINGS
// ===============================

exports.getSettings = async (req, res) => {

  try {

    const { userId } = req.params;



    if (!checkAccess(req, userId)) {

      return res.status(403).json({

        message:
          "Access denied."

      });

    }





    let settings =
      await Settings.findOne({
        user:userId
      });





    if (!settings) {

      settings =
        await Settings.create({

          user:userId

        });

    }





    res.status(200).json(settings);



  } catch(error) {


    console.error(
      "Get Settings Error:",
      error.message
    );



    res.status(500).json({

      message:
        "Failed to retrieve settings."

    });


  }

};







// ===============================
// UPDATE PROFILE
// ===============================

exports.updateProfile = async (req,res)=>{


  try {


    const { userId } =
      req.params;


    const {
      fullName,
      email
    } = req.body;





    if(!checkAccess(req,userId)){


      return res.status(403).json({

        message:
          "Access denied."

      });


    }






    if(email && !validator.isEmail(email)){


      return res.status(400).json({

        message:
          "Invalid email address."

      });


    }






    const settings =
      await Settings.findOneAndUpdate(


        {
          user:userId
        },


        {

          $set:{

            "profile.fullName":
              fullName,

            "profile.email":
              email?.toLowerCase().trim(),

          }

        },


        {

          new:true,

          upsert:true

        }


      );







    res.status(200).json({

      message:
        "Profile updated successfully.",

      settings

    });






  }catch(error){


    console.error(
      "Update Profile Error:",
      error.message
    );



    res.status(500).json({

      message:
        "Failed to update profile."

    });


  }

};








// ===============================
// UPDATE PREFERENCES
// ===============================

exports.updatePreferences = async(req,res)=>{


  try {


    const {
      userId
    } = req.params;


    const {
      theme
    } = req.body;





    if(!checkAccess(req,userId)){


      return res.status(403).json({

        message:
          "Access denied."

      });


    }






    const allowedThemes = [
      "light",
      "dark"
    ];





    if(theme && !allowedThemes.includes(theme)){


      return res.status(400).json({

        message:
          "Invalid theme."

      });


    }






    const settings =
      await Settings.findOneAndUpdate(


        {
          user:userId
        },


        {

          $set:{

            "preferences.theme":
              theme

          }

        },


        {

          new:true,

          upsert:true

        }


      );






    res.status(200).json({

      message:
        "Preferences updated successfully.",

      settings

    });






  }catch(error){


    console.error(
      "Update Preferences Error:",
      error.message
    );



    res.status(500).json({

      message:
        "Failed to update preferences."

    });


  }

};