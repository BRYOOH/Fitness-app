const express = require ("express");
const app = express();
const jwt= require("jsonwebtoken");
const Workouts= require("../Models/Workouts").Workouts

const WorkoutsInfo= async(req,res)=>{
  
    let check= await Workouts.findOne({user:req.body.user})

    if(!check){
        return res.status(200).json({success:false,errors:"There is no user logged in the Website" });
    }

    const Workout = new Workouts({
        category:req.body.category,
        workoutName:req.body.workoutName,
        sets:req.body.sets,
        reps:req.body.reps,
        weights:req.body.weights,
        duration:req.body.duration,
        caloriesBurnt:req.body.caloriesBurnt
     })

     await Workout.save();

     const data ={
        Workout:{
            id:Workout.id
        }
     }

     const token= jwt.sign(data,"secret_token");
     res.json({success:true,token})

}

module.exports={WorkoutsInfo};