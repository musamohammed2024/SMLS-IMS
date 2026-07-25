const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require("crypto");
const sendResetEmail = require("../services/emailService");

// ===============================
// PASSWORD VALIDATION
// ===============================

const validatePassword = (password) => {

  return (

    password.length >= 8 &&

    /[A-Z]/.test(password) &&

    /[a-z]/.test(password) &&

    /[0-9]/.test(password)

  );

};

// ===============================
// REGISTER USER
// ===============================

const registerUser = async (req,res)=>{

  try {

    const {

      name,

      email,

      password,

      role

    } = req.body;

    if(!name || !email || !password){

      return res.status(400).json({

        message:
        "Name, email and password are required."

      });

    }

    const cleanEmail =
    email.toLowerCase().trim();

    if(!validator.isEmail(cleanEmail)){

      return res.status(400).json({

        message:
        "Invalid email address."

      });

    }

    if(!validatePassword(password)){
      return res.status(400).json({
        message:
        "Password must contain uppercase, lowercase, number and be at least 8 characters."

      });


    }

    const existingUser =
    await User.findOne({

      email:cleanEmail

    });

    if(existingUser){
      return res.status(400).json({
        message:
        "User already exists."
      });


    }

    const hashedPassword =
    await bcrypt.hash(
      password,
      12
    );

    // =================================
    // ROLE SECURITY
    // Public registration cannot create admin
    // =================================


    const allowedRole =

      role === "staff"

      ?

      "staff"

      :

      "viewer";









    const user =
    await User.create({

      name:name.trim(),

      email:cleanEmail,

      password:hashedPassword,

      role:allowedRole,

      status:"Active"

    });









    res.status(201).json({

      success:true,


      message:
      "User registered successfully.",



      user:{


        id:user._id,

        name:user.name,

        email:user.email,

        role:user.role


      }


    });







  } catch(error){


    console.error(

      "REGISTER ERROR:",

      error.message

    );



    res.status(500).json({

      message:
      "Server error."

    });


  }


};











// ===============================
// LOGIN USER
// ===============================


const loginUser = async(req,res)=>{


  try {



    const {

      email,

      password

    } = req.body;







    if(!email || !password){


      return res.status(400).json({

        message:
        "Email and password are required."

      });


    }









    const cleanEmail =
    email.toLowerCase().trim();








    const user =
    await User.findOne({

      email:cleanEmail

    });








    if(!user){


      return res.status(401).json({

        message:
        "Invalid email or password."

      });


    }









    // Prevent bcrypt crash

    if(!user.password){


      return res.status(500).json({

        message:
        "Account password is missing. Contact administrator."

      });


    }









    // Check account status


    if(user.status === "Disabled"){


      return res.status(403).json({

        message:
        "Account disabled."

      });


    }









    const isMatch =
    await bcrypt.compare(

      password,

      user.password

    );









    if(!isMatch){


      return res.status(401).json({

        message:
        "Invalid email or password."

      });


    }









    if(!process.env.JWT_SECRET){


      throw new Error(

        "JWT_SECRET missing"

      );


    }









    const token =
    jwt.sign(


      {

        id:user._id,

        role:user.role


      },


      process.env.JWT_SECRET,


      {

        expiresIn:"1h"

      }


    );









    res.status(200).json({


      success:true,



      user:{


        id:user._id,

        name:user.name,

        email:user.email,

        role:user.role


      },



      token


    });









  } catch(error){



    console.error(

      "LOGIN ERROR:",

      error.message

    );



    res.status(500).json({

      message:
      "Server error."

    });


  }


};









// ===============================
// FORGOT PASSWORD
// ===============================

const forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required."
      });
    }

    const cleanEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: cleanEmail
    });

    if (!user) {
      return res.status(404).json({
        message: "No account found with that email."
      });
    }


    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");


    // Save token and expiry (1 hour)
    user.resetPasswordToken = resetToken;

    user.resetPasswordExpires =
      Date.now() + 3600000;


    await user.save();



    const resetLink =
      `http://localhost:5173/reset-password/${resetToken}`;



    await sendResetEmail(
      user.email,
      resetLink
    );



    res.status(200).json({

      success: true,

      message:
      "Password reset link has been sent to your email."

    });



  } catch (error) {


    console.error(

      "FORGOT PASSWORD ERROR:",

      error.message

    );



    res.status(500).json({

      message:
      "Server error."

    });


  }

};

// ===============================
// RESET PASSWORD
// ===============================

const resetPassword = async (req, res) => {

  try {

    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required."
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        message:
          "Password must contain uppercase, lowercase, number and be at least 8 characters."
      });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token."
      });
    }

    user.password = await bcrypt.hash(password, 12);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successfully."
    });

  } catch (error) {

    console.error("RESET PASSWORD ERROR:", error);

    res.status(500).json({
      message: "Server error."
    });

  }

};



// ===============================
// EXPORT CONTROLLERS
// ===============================

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword
};