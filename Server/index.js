const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { UserSignin, getDashboard, UserLogin, getWorkoutByDate, addWorkout } = require("./Controllers/Users.js");
const {verifyToken} = require("./Middleware/verifyToken.js")
const port =4000;

dotenv.config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_KEY).then
((resp)=>console.log("MongoDB is running")).catch((err)=>{console.log("MongoDB clashed");
})

app.get("/",(req,res)=>{
    res.send("Express app is running");
})

app.post("/signup",UserSignin);
app.post("/signin",UserLogin);
app.get("/dashboard",verifyToken,getDashboard);
app.get("/workout",verifyToken,getWorkoutByDate);
app.post("/workout",verifyToken,addWorkout);


app.listen(port,(error)=>{
    if(!error){
        console.log("Server is running on port:" + port)
    }
    else{
     console.log("Server not running" + error);
       
    }
})