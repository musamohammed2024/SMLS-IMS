const mongoose = require("mongoose");
const Faculty = require("../models/Faculty");
const Activity = require("../models/Activity");
const validator = require("validator");



// ==========================================
// CLEAN INPUT
// ==========================================

const cleanText = (value)=>{

  if(typeof value !== "string")
    return value;

  return value.trim();

};





// ==========================================
// VALIDATE NUMBER
// ==========================================

const safeNumber=(value)=>{

  if(value === undefined || value === "")
    return 0;


  const number = Number(value);


  return Number.isNaN(number)
    ? 0
    : number;

};








// ==========================================
// GET ALL FACULTY
// ==========================================

const getAllFaculty = async(req,res)=>{

try{


const faculty =
await Faculty.find()
.sort({

fullName:1

});



res.json(faculty);



}catch(error){

console.error(error);

res.status(500).json({

message:
"Failed to retrieve faculty records."

});


}

};









// ==========================================
// GET BY ID
// ==========================================

const getFacultyById = async(req,res)=>{

try{


const {id}=req.params;



if(!mongoose.Types.ObjectId.isValid(id)){

return res.status(400).json({

message:
"Invalid faculty ID."

});

}



const faculty =
await Faculty.findById(id);



if(!faculty){

return res.status(404).json({

message:
"Faculty record not found."

});

}



res.json(faculty);



}catch(error){

res.status(500).json({

message:
"Server error."

});

}


};









// ==========================================
// CREATE FACULTY
// ==========================================

const createFaculty = async(req,res)=>{
  console.log("Received ORCID:", req.body.orcid);

try{


const {
title,
fullName,
qualification,
fieldOfSpecialization,
academicRank,
telephone,
email
} = req.body;





if(

!fullName ||

!qualification ||

!fieldOfSpecialization ||

!academicRank ||

!telephone ||

!email

){

return res.status(400).json({

message:
"Required faculty information is missing."

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







const exists =
await Faculty.findOne({

email:cleanEmail

});





if(exists){

return res.status(400).json({

message:
"Faculty email already exists."

});

}





console.log("PUBLICATIONS RECEIVED");
console.log(req.body.totalPublications);
console.log(req.body.publicationsByYear);

const faculty = await Faculty.create({

  title: cleanText(title),

  fullName:
cleanText(fullName),

gender:
req.body.gender,

qualification:
cleanText(qualification),

fieldOfSpecialization:
cleanText(fieldOfSpecialization),

academicRank:
cleanText(academicRank),

currentPosition:
cleanText(req.body.currentPosition),


semesterLoad:
safeNumber(req.body.semesterLoad),


serviceYear:
safeNumber(req.body.serviceYear),


publicationsByYear:

req.body.publicationsByYear

?

JSON.parse(req.body.publicationsByYear)

:

{},

totalPublications:
safeNumber(req.body.totalPublications),

country:
cleanText(req.body.country || "Ethiopia"),

countryCode:
cleanText(req.body.countryCode || "+251"),


telephone:
cleanText(telephone),


email:
cleanEmail,


orcid: (() => {
  let orcid = cleanText(req.body.orcid);

  if (
    orcid &&
    orcid.includes("my-orcid?orcid=")
  ) {
    orcid =
      "https://orcid.org/" +
      orcid.split("my-orcid?orcid=")[1];
  }

  return orcid;
})(),


currentStatus:
req.body.currentStatus || "Active",


photo:

req.file
?
req.file.path
:
""

});


res.status(201).json(faculty);


} catch (error) {

  console.error("========== CREATE ERROR ==========");
  console.error(error);
  console.error(error.errors);
  console.error(error.stack);

  res.status(500).json({
    success: false,
    message: error.message,
    error: error
  });

}


};








// ==========================================
// UPDATE FACULTY
// ==========================================

const updateFaculty = async(req,res)=>{
  console.log("UPDATE ORCID:", JSON.stringify(req.body.orcid));

try{


const {id}=req.params;



if(!mongoose.Types.ObjectId.isValid(id)){

return res.status(400).json({

message:
"Invalid faculty ID."

});

}





const updateData={};



const allowed=[

"title",

"fullName",

"gender",

"qualification",

"fieldOfSpecialization",

"academicRank",

"currentPosition",

"semesterLoad",

"serviceYear",

"totalPublications",

"publicationsByYear",

"country",

"countryCode",

"telephone",

"email",

"orcid",

"currentStatus"

];




allowed.forEach((field) => {

  if (req.body[field] === undefined) return;

  if (field === "publicationsByYear") {

    updateData.publicationsByYear =
      JSON.parse(req.body.publicationsByYear);

  } else if (field === "totalPublications") {

    updateData.totalPublications =
      safeNumber(req.body.totalPublications);

  } else {

   if (field === "orcid") {

  let orcid = cleanText(req.body.orcid);

  if (
    orcid &&
    orcid.includes("my-orcid?orcid=")
  ) {
    orcid =
      "https://orcid.org/" +
      orcid.split("my-orcid?orcid=")[1];
  }

  updateData.orcid = orcid;

} else {

  updateData[field] =
    cleanText(req.body[field]);

}

  }

});






if(updateData.email){


updateData.email =
updateData.email.toLowerCase();



if(!validator.isEmail(updateData.email)){


return res.status(400).json({

message:
"Invalid email address."

});

}



const exists =
await Faculty.findOne({

email:updateData.email,

_id:{
$ne:id
}

});



if(exists){

return res.status(400).json({

message:
"Email already exists."

});

}


}







if(req.body.semesterLoad !== undefined){


updateData.semesterLoad =
safeNumber(req.body.semesterLoad);

}



if(req.body.serviceYear !== undefined){


updateData.serviceYear =
safeNumber(req.body.serviceYear);

}





if(req.file){

  updateData.photo =
  req.file.path;

}





const updated =
await Faculty.findByIdAndUpdate(

id,

updateData,

{

new:true,

runValidators:true

}

);





if(!updated){

return res.status(404).json({

message:
"Faculty not found."

});

}

await Activity.create({
  user: "Admin",
  action: "Updated Faculty",
  details: updated.fullName,
  module: "Faculty",
});



res.json(updated);



}catch (error) {

  console.error("UPDATE ERROR:");
  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message,
  });

}
}; 
// ==========================================
// DELETE FACULTY
// ==========================================

const deleteFaculty = async(req,res)=>{

try{


const {id}=req.params;



if(!mongoose.Types.ObjectId.isValid(id)){

return res.status(400).json({

message:
"Invalid faculty ID."

});

}




const deleted =
await Faculty.findByIdAndDelete(id);



if(!deleted){

return res.status(404).json({

message:
"Faculty not found."

});

}

await Activity.create({
  user: "Admin",
  action: "Deleted Faculty",
  details: deleted.fullName,
  module: "Faculty",
});

res.json({

  success: true,

  message:
  "Faculty deleted successfully."

});

}catch(error){


res.status(500).json({

message:
"Server error."

});


}

};







module.exports={

getAllFaculty,

getFacultyById,

createFaculty,

updateFaculty,

deleteFaculty

};