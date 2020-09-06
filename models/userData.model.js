const mongoose = require("mongoose");

var userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:'this field is required',
        unique: true,
        uniqueerror: "name must be unique"
    },
    password:{
        type:String,
        required:'this field is required'

    },
    type:{
        type:String,
        required:'this field is required'

    }
});


mongoose.model("user",userSchema);
