const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");


// ======================================
// CLOUDINARY STORAGE
// ======================================

const storage = new CloudinaryStorage({

  cloudinary: cloudinary,

  params: {

    folder: "faculty_photos",

    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp"
    ],

    transformation: [
      {
        width: 500,
        height: 500,
        crop: "limit",
        quality: "auto"
      }
    ]

  }

});




// ======================================
// FILE FILTER
// ======================================

const fileFilter = (req, file, cb) => {


  const allowedTypes = [

    "image/jpeg",
    "image/png",
    "image/webp"

  ];



  if (
    allowedTypes.includes(file.mimetype)
  ) {

    cb(null, true);

  } else {

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

const upload = multer({

  storage,

  fileFilter,


  limits: {

    fileSize:
      2 * 1024 * 1024,

    files: 1

  }

});



module.exports = upload;