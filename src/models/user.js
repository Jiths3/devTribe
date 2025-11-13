const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
    },

    lastname: {
        type: String

    },

    emailId: {
        type: String,
        unique:true,
        required:true,
        validate(value) {
            if (!validator.isEmail(value)){
                throw new Error("invalid email address: " + value);
            }
        }
    },

    password: {
        type: String,
        required:true
    },

     age: {
        type: String
     },

     gender: {
        type: String,
        validate(value) {
            if(!["male" , "female", "others"].includes(value)){
                throw new Error("Gender is not valid")
            }
        }
     },

     photoUrl: {
        type:String,
     },

     about: {
        type:String,
        default:"this is a default about the user",
     },

     skills: {
        type: [String],
     },

},{
    timestamps: true
});


const userModel = mongoose.model("User", userSchema);

module.exports = {userModel}; 