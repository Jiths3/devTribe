const express = require('express');

const app = express();

app.get("/" , (req,res) => {
    res.send("Hi nodemon test from the serverrrrrrr ////");
})

app.get("/hello" , (req,res) => {
    res.send("Hi nodemon test from HELLOOO");
});


app.listen(3000, () => {
    console.log("server is successfully connected to port 3000 !!!")
})