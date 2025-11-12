const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required:true,
    },

    lastname: {
        type: String

    },

    emailId: {
        type: String,
        unique:true,
        required:true
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