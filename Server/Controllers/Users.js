 const express = require("express");
 const app= express();
 const jwt = require("jsonwebtoken")
 const Users= require ("../Models/Users.js").Users;
 const Workouts= require("../Models/Workouts.js").Workouts;

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

 };

 const getDashboard = async(req,res) =>{
   
    let userId = req.User?.id;
    let user = await Users.findById(userId);

    if(!user){
        return res.status(400).json({success:false,errors:"User not found"});
    }

    const dateFormat = new Date();
    const startToday = new Date(
        dateFormat.getFullYear(),
        dateFormat.getMonth(),
        dateFormat.getDate()
    );

    const endDay = new Date(
        dateFormat.getFullYear(),
        dateFormat.getMonth(),
        dateFormat.getDate() + 1 
       );

       //calculate caloriesburnt
     const totalCaloriesBurnt = await Workouts.aggregate([
     {$match:{User:user._id,date:{$gte:startToday,$lt:endDay}}},
     {
     $group:{
         _id:null,
         totalCaloriesBurnt: {$sum:"$caloriesBurned"},
          },
      },
        ]);

    //Calculate total no of workouts
     const totalWorkouts = await Workouts.countDocuments({
         User: userId,
        date:{ $gte:startToday, $lt:endDay},
     });

    //Calculate avarage calories burnt per workout
    const avgCaloriesBurntPerWorkout = totalCaloriesBurnt.length > 0 ?
     totalCaloriesBurnt[0].totalCaloriesBurnt/totalWorkouts:0;

     //Fetch category of workouts
    categoryCalories = await Workouts.aggregate([
    {
      $match:{ User:user._id, data:{ $gte:startToday,$lt:endDay }}
     },
    {
    $group:{
        id: "$category",
        totalCaloriesBurnt:{ $sum: "$caloriesBurned"}
          } 
    }, 
    ]);

     //Format category data for pie chart
    const pieChartData = categoryCalories.map((category,index)=>({
    id: index,
    value:category.totalCaloriesBurnt,
    label:category._id,
    }));

    const weeks=[];
    const caloriesBurnt=[];

    for(let i=6;i>=0;i--){
        const date= new Date(
        currentDataFormatted.getTime() - i * 24 * 60 * 60 * 1000
     );

    weeks.push(`${date.getDate()}th`);

    const startofToday = new Date(
        dateFormat.getFullYear(),
        dateFormat.getMonth(),
        dateFormat.getDate()
        );
        
    const endofDay = new Date(
        dateFormat.getFullYear(),
        dateFormat.getMonth(),
         dateFormat.getDate() + 1 
        );
            
    const weekData = await Workouts.aggregate([
        {
        $match:{
            User:user._id,
            date:{$gte:startofToday,$lt:endofDay},
             },
         },
        {
        $group:{
            _id:{$dateToString:{format:"%Y-%m-%d", date:"$date"}},
            totalCaloriesBurnt:{ $sum:"$caloriesBurned"},
                },
        }, 
        {
            $sort:{ _id:1}, //Sort by date in ascending order
        },
    ]);
                
    caloriesBurnt.push(
        weekData[0]?.totalCaloriesBurnt?weekData[0]?. totalCaloriesBurnt:0
    );
}

 return res.status(200).json({
    totalCaloriesBurnt:
      totalCaloriesBurnt.length > 0
        ? totalCaloriesBurnt[0].totalCaloriesBurnt
        : 0,
    totalWorkouts: totalWorkouts,
    avgCaloriesBurntPerWorkout: avgCaloriesBurntPerWorkout,
    totalWeeksCaloriesBurnt: {
      weeks: weeks,
      caloriesBurned: caloriesBurnt,
    },
    pieChartData: pieChartData,
  });


 }
 
 module.exports ={UserSignin,getDashboard};


