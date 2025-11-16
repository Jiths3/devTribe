const express = require('express');
const {connectDB} = require('./config/database');
const {userModel} = require("./models/user");
const {validateSignUpData} = require("./utils/validations")
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.post("/signUp", async (req,res) => {


    try{

    // Validation of data

    const {firstname, lastname, emailId, password , gender} = req.body

    validateSignUpData(req);  

    // Encryption of Password 

    const passwordHash = await bcrypt.hash(password,10);
    console.log(passwordHash);


    
    const user = new userModel({
        firstname,
        lastname,
        emailId,
        password:passwordHash,
        gender,
    });
    
        await user.save();
        res.send("User Added Successfully");   
    }
    catch(err){
        res.status(400).send("ERROR :" + err);

    }
});

// fetch all data

app.get("/user", async (req,res)=>{

    try{
            const user = await userModel.find({});
            res.send(user);
        }

    catch (err) {
        res.status(400).send("Something Went Wrong");

    }


})

//Delete User data 

app.delete("/deleteUser", async(req,res)=>{

    const userId = req.body.userId;

    try{
        const user = await userModel.findByIdAndDelete(userId);
        res.send("User Deleted Successfully");

    }

    catch (err) {
        res.status(400).send("Something Went Wrong");

    }
})

// Update User data 

app.patch("/updateUser/:email" , async(req,res) => {


    const email = req.params?.email;
    const data = req.body;

    try{
        const Allowed_Updates = ["lastname" ,"photoUrl", "about" , "gender", "age", "skills","firstname"];
        const isUpdateAllowed = Object.keys(data).every((k)=>Allowed_Updates.includes(k));
        
        if (!isUpdateAllowed){
            throw new Error("Update Not allowed");
        }
        
        await userModel.findOneAndUpdate({emailId : email}, data, {runValidators:true})
        res.send("User Updated Successfully");


    }

    catch (err) {
        res.status(400).send("Update Failed:" + err.message);


    }
})

// User Login 

app.post("/login" , async(req,res) => {



    try{
    const {emailId,password} = req.body

    const user = await userModel.findOne({emailId:emailId});

    if(!user){
        throw new Error("Invalid Credentials")
    }
    
    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(isPasswordValid){
        res.send("login Successfull")
    }

    else{
        throw new Error("Invalid Credentials")
    }

    }

    catch (err) {
        res.status(400).send("Update Failed:" + err.message);

    }
})


// find user by email


// app.get("/user", async (req,res)=>{
//     const userEmail = req.body.emailId;

//     try{
//             const user = await userModel.find({emailId:userEmail});
//             res.send(user);

//         }

//     catch (err) {
//         res.status(400).send("Something Went Wrong");

//     }


// })



// app.get("/user", async (req,res)=>{
//     const userId = req.body.Id;

//     try{
//         const user = await userModel.findById(userId)
//         res.send(user);

//     }

//     catch(err){
//         res.status(404).send("User Not Found");

//     }
// })

    










connectDB().then(()=>{
    console.log("Database connection established")
    app.listen(3000, () => {
    console.log("server is successfully connected to port 3000 !!!")
    })
})
.catch(err => {
    console.error("Database cannot be connected");
});
