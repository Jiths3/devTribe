const express = require('express');

const app = express();

app.use("/admin", (req,res,next) => {
    console.log("admin is being checked");
    const token ="xyz";
    const isAuthorized = token == "xyz";

    if (isAuthorized){
        next();
    }
    else {
        res.status(401).send("Admin is not Authorised Sorry Try Again and fail better");

    }
})

app.get("/admin/getUserData" , (req,res) => {

    res.send("Fetched User Data");

}),

app.get("/admin/deleteUserData" , (req,res) => {

    res.send("Deleted User Data");
    
}),


app.listen(3000, () => {
    console.log("server is successfully connected to port 3000 !!!")
})