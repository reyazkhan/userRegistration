const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/UserRegister",
    {useNewUrlParser:true},(err)=>{
        if(!err){console.log("mongodb connected")}
        else{
            console.log(err)
        }
    });

require("./userData.model");