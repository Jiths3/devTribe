const express = require('express');

const app = express();



// const { adminAuth } = require("./middlewares/auth");

// app.use("/admin", adminAuth);

// app.get("/admin/getUserData" , (req,res) => {

//     res.send("Fetched User Data");

// }),

// app.get("/admin/deleteUserData" , (req,res) => {

//     res.send("Deleted User Data");
    
// }),



app.get("/getUserData", (req,res) =>{

    throw new Error("ksmdkammd");
    res.send("user data send");
}) 



app.use((err,req,res,next) =>{
    if(err){
    res.status(500).send("Something Went Wrong");
    }
}) ;

app.listen(3000, () => {
    console.log("server is successfully connected to port 3000 !!!")
})