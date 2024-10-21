 const express = require("express");
 const app= express();
 const jwt = require("jsonwebtoken")
 const Users= require ("../Models/Users.js").Users;

const UserSignin = async(req,res)=>{

    let check = await Users.findOne({email:req.body.email});

    if(check){
       return res.status(400).json({success:false,errors: "existing user with the same email address"})
    }

    const User = new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    await User.save();

    const data={
        User:{
            id:User.id
        }
    }

    const token = jwt.sign(data,'secret_token');
    res.json({success:true,token})

 }
 

 module.exports ={UserSignin};

