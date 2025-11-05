const express = require('express');
const {connectDB} = require('./config/database');
const {userModel} = require("./models/user");

const app = express();


app.post("/signUp", async (req,res) => {

    const user = new userModel({
        firstName:"Jithin",
        lastname:"Russel",
        emailId:"jithinchacko71@gmail.com",
        password:"jiths1234",
    })

    try{

        await user.save();
        res.send("User Added Successfully");
        
    }
    catch(err){
        res.status(400).send("Error saving the user");

    }
    
    

});



connectDB().then(()=>{
    console.log("Database connection established")
    app.listen(3000, () => {
    console.log("server is successfully connected to port 3000 !!!")
    })
})
.catch(err => {
    console.error("Database cannot be connected");
});
