const express = require('express');

const app = express();

app.get("/user" , (req,res,next) => {

    console.log("GO to Response Handler 2")
    // res.send("Hi nodemon test from the serverrrrrrr 1");
    next();
},

[(req,res,next) => {
    // res.send("Hi nodemon test from the serverrrrrrr 2");
    next()
},

(req,res) => {
    res.send("Hi nodemon test from the serverrrrrrr 3");
}]

)


app.listen(3000, () => {
    console.log("server is successfully connected to port 3000 !!!")
})