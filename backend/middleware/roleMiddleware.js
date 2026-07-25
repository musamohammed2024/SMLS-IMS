const roleMiddleware = (...allowedRoles) => {


  const validRoles = [

    "admin",

    "staff",

    "viewer"

  ];





  // Normalize allowed roles

  const normalizedRoles =

    allowedRoles.map(role =>

      String(role).toLowerCase()

    );






  // Check invalid developer configuration

  const invalidRoles =

    normalizedRoles.filter(

      role => !validRoles.includes(role)

    );






  if(invalidRoles.length > 0){


    console.error(

      "Invalid role configuration:",

      invalidRoles

    );


    return (

      req,

      res,

      next

    )=>{


      return res.status(500).json({

        success:false,

        message:
          "Server configuration error."

      });


    };


  }







  return (req,res,next)=>{





    // ===============================
    // AUTHENTICATION CHECK
    // ===============================


    if(!req.user){


      return res.status(401).json({

        success:false,

        message:
          "Unauthorized access."

      });


    }








    // ===============================
    // ROLE CHECK
    // ===============================


    const userRole =

      String(req.user.role)

      .toLowerCase();






    if(!normalizedRoles.includes(userRole)){



      console.warn(

        "Permission denied:",

        {

          user:
            req.user.id,

          role:
            userRole,

          attempted:
            req.originalUrl

        }

      );




      return res.status(403).json({

        success:false,

        message:
          "You do not have permission for this action."

      });


    }






    next();



  };


};






module.exports = roleMiddleware;