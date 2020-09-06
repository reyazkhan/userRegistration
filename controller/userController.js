const express=require('express');
var router =express.Router();
const mongoose=require("mongoose");
var MongoClient = require('mongodb').MongoClient;
const path=require("path");
const user=mongoose.model('user');

router.get("/",(req,res)=>{
    res.render("hbsfile/AddorEdit",{
        viewTitle:"Insert User"
    });
});

router.post("/",(req,res)=>{
    console.log(req.body);
    insertRecord(req,res);
});

function insertRecord(req,res){
    var userData=new user();
    userData.fullname=req.body.Name;
    userData.password=req.body.password;
    userData.type=req.body.type;
    userData.save((err,doc)=>{
        if(!err)
            res.redirect('user/registered');
        else{
            if(err.name=="ValidationError" || err.name=="submitValidationError" || 
                    err.name=="MongoError" ||err.code === E11000){
                handleValidationError(err,req.body);
                res.render("hbsfile/AddorEdit",{
                    viewTitle:"Insert User",
                    userData:req.body
                });
            }
            console.log("error during submit " +err);
        }
    });
}

router.get("/registered",(req,res)=>{
    res.json("you are registered now you can login");
});



//for login submit
router.get("/login",(req,res)=>{
    //res.json("login here ");
            res.render("hbsfile/list",{
                
            });
        
});

router.post("/login",(req,res)=>{
    console.log(req.body);
    MongoClient.connect("mongodb://localhost:27017/UserRegister", function(err, db) {
        if (err) throw err;
        let dbo = db.db("UserRegister");
        let cursor = dbo.collection('users').find();
         cursor.each(function(err,doc) {
          if (doc == req.body.fullname && req.body.type){
            console.log("goto next page");
            if(req.body.type=="A"){
                res.redirect("login/type-A");
            }
            else if(req.body.type=="B"){
                res.redirect("login/type-B");
            }
            else{
                res.redirect("login/type-C");
            }
          }
          else{
            console.log('not login');            
          }
         });
          db.close();
        });
      });  

router.get("/login/type-A",(req,res)=>{
    //res.json("you are login as user A");
    res.render("type/type-A");
});
router.get("/login/type-C",(req,res)=>{
    // res.json("you are login as user C");

    res.render("type/type-C");

});
router.get("/login/type-B",(req,res)=>{
    // res.json("you are login as user B");
    res.render("type/type-B");

});

function handleValidationError(err,body){
    for(field in err.errors){
        switch(err.errors[field].path){
            case "fullname":
                body['fullnameError']=err.errors[field].message;

                break;
            case "password":
                body['passwordError']=err.errors[field].message;
                break;
            case "type":
                body['typeError']=err.errors[field].message;
                break;
                        
        }
    }
}
module.exports = router;