const mongoose = require("mongoose");

 const Workouts = mongoose.model("Workouts",{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    workoutName:{
        type:String,
        required:true,
        unique:true,
    },
    sets:{
        type:Number,
    },
    reps:{
        type:Number,
    },
    weights:{
        type:Number,
    },
    duration:{
        type:Number,
    },
    caloriesBurnt:{
        type:Number,
    },
    date:{
        type:Date,
        default:Date.now,
    }
},
// {timestamps:true}
);

module.exports= {Workouts};