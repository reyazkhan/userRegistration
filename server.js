require("./models/db");

const express =require("express");
const path =require("path");
const userController=require("./controller/userController");
// const Handlebars = require('handlebars');
//const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const exphbs=require("express-handlebars");
const bodyParser=require("body-parser");
const cors=require("cors");
var app=express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());
app.use(express.static("image"));
app.set("views",path.join(__dirname,"/views/"));
app.engine("hbs",exphbs({
    extname:"hbs",
    defaultLayout:"mainLayout",
    // handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir:__dirname+"/views/layouts/"}));
app.set("view engine","hbs");
app.set("views",path.join(__dirname, "views"));


app.listen(3000,()=>{
    console.log("express server listening")
});

app.use("/user",userController);