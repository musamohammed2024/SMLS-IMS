const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

require("dotenv").config();


const app = express();

app.set("trust proxy", 1);



// ======================================
// ENVIRONMENT VALIDATION
// ======================================

if (!process.env.MONGO_URI) {

  console.error(
    "MONGO_URI is missing in .env"
  );

  process.exit(1);

}



if (!process.env.JWT_SECRET) {

  console.error(
    "JWT_SECRET is missing in .env"
  );

  process.exit(1);

}






// ======================================
// SECURITY HEADERS
// ======================================


app.use(

  helmet({

    crossOriginResourcePolicy:false,

  })

);



app.disable(
  "x-powered-by"
);







// ======================================
// GENERAL RATE LIMIT
// ======================================


const apiLimiter = rateLimit({

  windowMs:
    15 * 60 * 1000,


  max:
    200,


  standardHeaders:true,

  legacyHeaders:false,


  message:{

    success:false,

    message:
    "Too many requests. Please try again later."

  }

});



app.use(
  "/api",
  apiLimiter
);








// ======================================
// LOGIN RATE LIMIT
// ======================================


const loginLimiter = rateLimit({

  windowMs:
    15 * 60 * 1000,


  max:
    10,


  standardHeaders:true,

  legacyHeaders:false,


  message:{

    success:false,

    message:
    "Too many login attempts. Try again later."

  }

});


app.use(

  "/api/auth/login",

  loginLimiter

);









// ======================================
// CORS CONFIGURATION
// ======================================

const allowedOrigins = [

  "http://localhost:5173",
  "https://smls-ims.vercel.app"

];


app.use(
  cors({
    origin:(origin, callback)=>{

      if(!origin){
        return callback(null, true);
      }

      if(allowedOrigins.includes(origin)){
        return callback(null, true);
      }

      console.warn(
        "Blocked CORS origin:",
        origin
      );

      return callback(
        new Error("CORS blocked")
      );

    },

    credentials:true

  })
);


// ======================================
// BODY PARSING
// ======================================


app.use(

express.json({

limit:"10kb"

})

);



app.use(

express.urlencoded({

extended:true,

limit:"10kb"

})

);









// ======================================
// REQUEST LOGGER
// ======================================


app.use(

(req,res,next)=>{


console.log(

`${req.method} ${req.originalUrl}`

);


next();


}

);









// ======================================
// STATIC FILES
// ======================================


app.use(

"/uploads",

express.static(

path.join(

__dirname,

"uploads"

),

{


setHeaders:(res)=>{


res.setHeader(

"X-Content-Type-Options",

"nosniff"

);



res.setHeader(

"Cross-Origin-Resource-Policy",

"cross-origin"

);



}

}

)

);









// ======================================
// API ROUTES
// ======================================


app.use(

"/api/auth",

require("./routes/authRoutes")

);



app.use(

"/api/faculty",

require("./routes/facultyRoutes")

);



app.use(

"/api/stats",

require("./routes/statsRoutes")

);



app.use(

"/api/users",

require("./routes/userRoutes")

);



app.use(

"/api/user",

require("./routes/userManagementRoutes")

);



app.use(

"/api/reports",

require("./routes/reportsRoutes")

);



app.use(

"/api/settings",

require("./routes/settingsRoutes")

);











// ======================================
// HOME TEST
// ======================================


app.get(

"/",

(req,res)=>{


res.json({

success:true,

message:
"Faculty MIS Backend Running"

});


}

);









// ======================================
// 404 HANDLER
// ======================================


app.use(

(req,res)=>{


res.status(404).json({

success:false,

message:
"Route not found"

});


}

);









// ======================================
// GLOBAL ERROR HANDLER
// Handles:
// - Multer errors
// - CORS errors
// - Server errors
// ======================================


app.use(

(err,req,res,next)=>{


console.error(

"GLOBAL ERROR:",

err.message

);





// Multer errors

if(err.name === "MulterError"){



if(err.code === "LIMIT_FILE_SIZE"){


return res.status(400).json({

success:false,

message:
"File too large. Maximum upload size is 2MB."

});


}



return res.status(400).json({

success:false,

message:
"File upload error."

});


}








// Upload validation error


if(

err.message &&

err.message.includes(

"Only JPG"

)

){


return res.status(400).json({

success:false,

message:
err.message

});


}








// CORS error


if(

err.message === "CORS blocked"

){


return res.status(403).json({

success:false,

message:
"Origin not allowed."

});


}








// Default error


return res.status(500).json({

success:false,

message:
"Internal server error."

});


}

);









// ======================================
// DATABASE CONNECTION
// ======================================


mongoose.connect(

process.env.MONGO_URI,

{

serverSelectionTimeoutMS:5000

}

)

.then(()=>{


console.log(

"MongoDB Connected"

);


})

.catch((error)=>{


console.error(

"MongoDB Error:",

error.message

);


process.exit(1);


});











// ======================================
// START SERVER
// ======================================


const PORT =

process.env.PORT || 5000;




const server = app.listen(

PORT,

()=>{


console.log(

`Server running on port ${PORT}`

);


}

);









// ======================================
// GRACEFUL SHUTDOWN
// ======================================


process.on(

"SIGINT",

async()=>{


console.log(

"Shutting down server..."

);



await mongoose.connection.close();



server.close(()=>{


console.log(

"Server closed"

);


process.exit(0);


});


}

);