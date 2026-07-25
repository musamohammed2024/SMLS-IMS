const mongoose = require("mongoose");
const validator = require("validator");


const settingsSchema = new mongoose.Schema(

  {

    user: {

      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

      unique: true,

    },



    profile: {

      fullName: {

        type: String,

        default: "",

        trim: true,

        maxlength: 100,

      },


      email: {

        type: String,

        default: "",

        trim: true,

        lowercase: true,

        validate: {

          validator: function(value) {

            if (!value) return true;

            return validator.isEmail(value);

          },

          message:
            "Invalid email address."

        }

      },

    },





    preferences: {

      theme: {

        type: String,

        enum: [
          "light",
          "dark"
        ],

        default:"light",

      },

    },


  },


  {

    timestamps:true,

  }


);





module.exports =
mongoose.model(
  "Settings",
  settingsSchema
);