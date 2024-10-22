const express = require("express");
const app= express();
const jwt = require("jsonwebtoken")
const Users= require ("../Models/Users.js").Users;

const Signin = async(req,res)=>{

   let check = await Users.findOne({email:req.body.email});

   if(!check){
      return res.status(400).json({success:false,errors: "no user with existing email address"})
   }

   let checkPass = await Users.findOne({password:req.body.password}); 

   if (!checkPass) {
    return res.status(400).json({
        success: false,
        errors: "Invalid password"
    });
}
   
   const data={
       User:{
           id:Users.id
       }
   }

   const token = jwt.sign(data,'secret_token');
   res.json({success:true,token})

}


module.exports ={Signin};

