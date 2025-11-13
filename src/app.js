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
        res.status(400).send("Something went Wrong User Cannot be added:" + err);

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
