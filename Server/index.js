const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const env = require("dotenv");
const { UserSignin, getDashboard, UserLogin } = require("./Controllers/Users.js");
const { WorkoutsInfo } = require("./Controllers/Workouts.js");
const {verifyToken} = require("./Middleware/verifyToken.js")
const port =4000;

env.config();

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://brianmuchira001:Muriukis@cluster0.c8atalq.mongodb.net/GymFit").then
((resp)=>console.log("MongoDB is running")).catch((err)=>{console.log("MongoDB clashed");
})

app.get("/",(req,res)=>{
    res.send("Express app is running");
})

app.post("/signup",UserSignin);
app.post("/addworkout", WorkoutsInfo);
app.post("/signin",UserLogin);
app.get("/dashboard",verifyToken,getDashboard);

app.listen(port,(error)=>{
    if(!error){
        console.log("Server is running on port:" + port)
    }
    else{
     console.log("Server not running" + error);
       
    }
})