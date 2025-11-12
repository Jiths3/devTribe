const mongoose = require("mongoose");


const connectDB = async () => {

   await mongoose.connect("mongodb+srv://jiths1234:WU7KuYEyNh5bfG3I@namastenode.4bmdosr.mongodb.net/?appName=NamasteNode"
      , {dbName: "devTribe"});

};



module.exports = {connectDB};

