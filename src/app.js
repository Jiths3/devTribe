const express = require('express');
const {connectDB} = require('./config/database');
const {userModel} = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signUp", async (req,res) => {

    const user = new userModel(req.body);


    try{
        await user.save();
        res.send("User Added Successfully");   
    }
    catch(err){
        res.status(400).send("Error saving the user");

    }
});


// find user by email

app.get("/user", async (req,res)=>{
    const userId = req.body.Id;

    try{
        const user = await userModel.findById(userId)
        res.send(user);

    }

    catch(err){
        res.status(404).send("User Not Found");

    }



    // try{
    //         const user = await userModel.find({emailId:userEmail});
    //         res.send(user);


    //     }

    // catch (err) {
    //     res.status(400).send("Something Went Wrong");

    // }


})



connectDB().then(()=>{
    console.log("Database connection established")
    app.listen(3000, () => {
    console.log("server is successfully connected to port 3000 !!!")
    })
})
.catch(err => {
    console.error("Database cannot be connected");
});
