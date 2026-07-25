const multer = require("multer");
const path = require("path");
const fs = require("fs");




// ======================================
// UPLOAD DIRECTORY
// ======================================


const uploadDirectory =
path.join(

  __dirname,

  "../uploads"

);



if(!fs.existsSync(uploadDirectory)){


fs.mkdirSync(

  uploadDirectory,

  {

    recursive:true

  }

);


}








// ======================================
// STORAGE
// ======================================


const storage =
multer.diskStorage({


destination:(req,file,cb)=>{


cb(

null,

uploadDirectory

);


},





filename:(req,file,cb)=>{


const uniqueName =

Date.now()

+

"-"

+

Math.round(Math.random()*1000000000);






let extension = "";



switch(file.mimetype){


case "image/jpeg":

extension=".jpg";

break;



case "image/png":

extension=".png";

break;



case "image/webp":

extension=".webp";

break;



default:

extension="";

}





cb(

null,

uniqueName + extension

);



}



});









// ======================================
// FILE FILTER
// ======================================


const fileFilter =
(req,file,cb)=>{


const allowedTypes=[

"image/jpeg",

"image/png",

"image/webp"

];






if(

allowedTypes.includes(

file.mimetype

)

){


cb(

null,

true

);


}

else{


cb(

new Error(

"Only JPG, PNG and WEBP images are allowed."

),

false

);


}


};









// ======================================
// MULTER CONFIG
// ======================================


const upload =
multer({


storage,


fileFilter,



limits:{


fileSize:

2 *

1024 *

1024,


files:1


}


});






module.exports = upload;