const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const mongoose = require("mongoose");



// ===============================
// PASSWORD VALIDATION
// ===============================

const validatePassword = (password)=>{

  return (

    password.length >= 8 &&

    /[A-Z]/.test(password) &&

    /[a-z]/.test(password) &&

    /[0-9]/.test(password)

  );

};




// ===============================
// CHECK USER ACCESS
// ===============================

const checkAccess = (req,id)=>{

  return (

    req.user.role === "admin" ||

    req.user.id.toString() === id.toString()

  );

};








// =====================================================
// CREATE USER
// =====================================================

const createUser = async(req,res)=>{


try{


const {
name,
email,
password,
role
}=req.body;



if(!name || !email || !password){

return res.status(400).json({

message:
"Name, email and password are required."

});

}




const cleanEmail =
email.trim().toLowerCase();




if(!validator.isEmail(cleanEmail)){

return res.status(400).json({

message:
"Invalid email address."

});

}





if(!validatePassword(password)){

return res.status(400).json({

message:
"Password must contain uppercase, lowercase and number."

});

}





const exists =
await User.findOne({

email:cleanEmail

});




if(exists){

return res.status(400).json({

message:
"Email already exists."

});

}





let selectedRole = "viewer";

if (req.user && req.user.role === "admin") {

  const allowedRoles = [
    "admin",
    "staff",
    "viewer"
  ];

  selectedRole = allowedRoles.includes(role)
    ? role
    : "viewer";

}
else {

  selectedRole =
    role === "staff"
    ? "staff"
    : "viewer";

}


const user =
await User.create({

name:name.trim(),

email:cleanEmail,

password:
await bcrypt.hash(password,12),

role:selectedRole

});





res.status(201).json({

message:
"User created successfully.",

user:{

id:user._id,

name:user.name,

email:user.email,

role:user.role

}

});



}catch(error){

console.error(error.message);

res.status(500).json({

message:
"Server error."

});


}


};









// =====================================================
// GET ALL USERS
// =====================================================

const getUsers = async(req,res)=>{


try{


const users =
await User.find()

.select("-password")

.sort({

name:1

});



res.json(users);



}catch(error){

res.status(500).json({

message:
"Server error."

});

}


};









// =====================================================
// GET USER BY ID
// =====================================================

const getUserById = async(req,res)=>{


try{


const {id}=req.params;



if(!mongoose.Types.ObjectId.isValid(id)){

return res.status(400).json({

message:
"Invalid user ID."

});

}




if(!checkAccess(req,id)){

return res.status(403).json({

message:
"Access denied."

});

}





const user =
await User.findById(id)

.select("-password");





if(!user){

return res.status(404).json({

message:
"User not found."

});

}



res.json(user);



}catch(error){

res.status(500).json({

message:
"Server error."

});

}


};









// =====================================================
// UPDATE PROFILE
// =====================================================

const updateUserProfile = async(req,res)=>{


try{


const {id}=req.params;



if(!mongoose.Types.ObjectId.isValid(id)){

return res.status(400).json({

message:
"Invalid user ID."

});

}





if(!checkAccess(req,id)){

return res.status(403).json({

message:
"Access denied."

});

}





const updateData={};



if(req.body.name){

updateData.name =
req.body.name.trim();

}



if(req.body.email){


const email =
req.body.email.trim().toLowerCase();



if(!validator.isEmail(email)){

return res.status(400).json({

message:
"Invalid email."

});

}



const exists =
await User.findOne({

email,

_id:{
$ne:id
}

});



if(exists){

return res.status(400).json({

message:
"Email already in use."

});

}



updateData.email=email;


}

// Update role (Admin only)
if (req.body.role && req.user.role === "admin") {

  const allowedRoles = [
    "admin",
    "staff",
    "viewer"
  ];

  if (allowedRoles.includes(req.body.role)) {
    updateData.role = req.body.role;
  }

}



const user =
await User.findByIdAndUpdate(

id,

updateData,

{

new:true

}

)

.select("-password");





res.json({

message:
"User updated successfully.",

user

});



}catch(error){

res.status(500).json({

message:
"Server error."

});

}


};









// =====================================================
// CHANGE PASSWORD
// =====================================================

const changePassword = async(req,res)=>{


try{


const {id}=req.params;



if(!checkAccess(req,id)){

return res.status(403).json({

message:
"Access denied."

});

}





const {
newPassword
}=req.body;




if(!validatePassword(newPassword)){

return res.status(400).json({

message:
"Password does not meet requirements."

});

}




const user =
await User.findById(id);



if(!user){

return res.status(404).json({

message:
"User not found."

});

}




user.password =
await bcrypt.hash(newPassword,12);



await user.save();





res.json({

message:
"Password updated successfully."

});



}catch(error){

res.status(500).json({

message:
"Server error."

});

}


};









// =====================================================
// DELETE USER
// =====================================================

const deleteUser = async(req,res)=>{


try{


const {id}=req.params;



if(!mongoose.Types.ObjectId.isValid(id)){

return res.status(400).json({

message:
"Invalid user ID."

});

}



const user =
await User.findByIdAndDelete(id);





if(!user){

return res.status(404).json({

message:
"User not found."

});

}




res.json({

message:
"User deleted successfully."

});



}catch(error){

res.status(500).json({

message:
"Server error."

});

}


};








module.exports={

createUser,

getUsers,

getUserById,

updateUserProfile,

changePassword,

deleteUser

};