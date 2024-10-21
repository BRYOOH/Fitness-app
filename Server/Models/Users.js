const mongoose = require("mongoose");

 const Users = mongoose.model("Users",{
    //Schema
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }
});

module.exports= {Users};