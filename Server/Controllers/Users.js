 const jwt = require("jsonwebtoken");
 const dotenv = require('dotenv')
 const Users= require ("../Models/Users.js").Users;
 const Workouts= require("../Models/Workouts.js").Workouts;

 dotenv.config();

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

 const UserLogin= async (req,res) =>{

    const { email,password } = req.body;

    const user = await Users.findOne({email:email});

    if(!user){
        res.status(400).json({success:false,errors:"User email not found"})
    }

    const checkPassword = await Users.findOne({password:password});

    if(!checkPassword){
      res.status(400).json({success:false,errors:"User password not found"})
    }

    const token = jwt.sign({id:user._id},"secret_token");

   return res.json({token,user:{id:user._id,email:user.email}});

 };

const getDashboard = async(req,res) =>{
    
    let userId = req.user.id;
    let user = await Users.findById(userId);

    console.log(user);
    
    if(!user){
        return res.status(400).json({success:false,errors:"User not found"});
    }

    const currentDataFormatted = new Date();
    const startToday = new Date(
        currentDataFormatted.getFullYear(),
        currentDataFormatted.getMonth(),
        currentDataFormatted.getDate()
    );

    const endDay = new Date(
        currentDataFormatted.getFullYear(),
        currentDataFormatted.getMonth(),
        currentDataFormatted.getDate() + 1 
       );

       //calculate caloriesburnt
     const totalCaloriesBurnt = await Workouts.aggregate([
     {$match:{user:user._id,date:{$gte:startToday,$lt:endDay}}},
     {
     $group:{
         _id:null,
         totalCaloriesBurnt: {$sum:"$caloriesBurnt"},
          },
      },
        ]);

    //Calculate total no of workouts
     const totalWorkouts = await Workouts.countDocuments({
         user: userId,
        date:{ $gte:startToday, $lt:endDay},
     });

    //Calculate avarage calories burnt per workout
    const avgCaloriesBurntPerWorkout = totalCaloriesBurnt.length > 0 ?
     totalCaloriesBurnt[0].totalCaloriesBurnt/totalWorkouts:0;

     //Fetch category of workouts
   const categoryCalories = await Workouts.aggregate([
    {
      $match:{ user:user._id, date:{ $gte:startToday,$lt:endDay }}
     },
    {
    $group:{
        _id: "$category",
        totalCaloriesBurnt:{ $sum: "$caloriesBurnt"}
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
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
        );
        
    const endofDay = new Date(
        date.getFullYear(),
        date.getMonth(),
         date.getDate() + 1 
        );
            
    const weekData = await Workouts.aggregate([
        {
        $match:{
            user:user._id,
            date:{$gte:startofToday,$lt:endofDay},
             },
         },
        {
        $group:{
            _id:{$dateToString:{format:"%Y-%m-%d", date:"$date"}},
            totalCaloriesBurnt:{ $sum:"$caloriesBurnt"},
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
      caloriesBurnt: caloriesBurnt,
    },
    pieChartData: pieChartData,
  });


 }

 const getWorkoutByDate = async(req,res) =>{

    const userId =req.user?.id;
    const user= await Users.findById(userId);

    let date =req.query.date ? new Date(req.query.date):new Date();
    console.log(date);
    
    if(!user){
        res.status(400).json({success:false,errors:"User not found!"})
    }

    const startToday  = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
    const endDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
    );
     

    const todayWorkouts = await Workouts.find({
        user: userId,
        date:{$gte:startToday,$lt:endDay},
    });

    const totalCaloriesBurnt= todayWorkouts.reduce(
        (total,workout) => total + workout.caloriesBurnt,
        0
    );

    return res.json({success:true,todayWorkouts,totalCaloriesBurnt});
 };
 
 const addWorkout = async(req,res)=>{
 
    const userId = req.user?.id;
    const {workoutString} = req.body;

    if(!workoutString){
        return res.status(400).json({success:false, errors:"Workout string missing"});
    }

    const eachworkout= workoutString.split(";").map((line)=>line.trim());
    const categories = eachworkout.filter((line)=>line.startsWith("#"));
    if(categories.length === 0){
        return res.status(400).json({success:false,errors:"No categories found in workout string "})
    }

    const parseWorkouts=[];
    let currentCategory = "";
    let count=0;

    //Loop through each line to parse workout details
    await eachworkout.forEach((line)=>{
        count++;
        if(line.startsWith("#")){
            const parts = line?.split("\n").map((part)=>part.trim());
            console.log(parts);
            
            if(parts.length <5){
                return res.status(400).json({success:false, errors:`Workout string is missing for ${count}th workout`});
            }
            
            //update current category
            currentCategory = parts[0].substring(1).trim();
            
            //extract workout details
            const workoutDetails = parseWorkoutLine(parts);
            if(workoutDetails == null){
                return res.status(400).json({success:false, errors:"Please enter in proper format"});
            }

            if(workoutDetails){
            //add category to workout details
            workoutDetails.category = currentCategory;
            workoutDetails.caloriesBurnt = calculateCaloriesBurnt(workoutDetails);
            parseWorkouts.push(workoutDetails);
            }else{
                return res.status(400).json({success:false,errors:`Workout sttring is missing for ${count}th workout`});
            }

        }
    });

    const createWorkout = await Promise.all(parseWorkouts.map( async (workout)=>{
        workout.caloriesBurnt = parseFloat(calculateCaloriesBurnt(workout));
        return Workouts.create({...workout,user:userId,date: Date.now()});
    }));

    return res.json({success:true,errors:"Workout added successfully", workouts:createWorkout});

};
    
const parseWorkoutLine = (parts) => {
    const details = {};
    console.log(parts);
    if (parts.length >= 5) {
      details.workoutName = parts[1].trim();
      const setReps = parts[2].trim();
      const [repStr , setStr] = setReps.split("X").map(s=>s.trim());
      details.sets = parseInt(setStr.split("sets")[0].trim());
      details.reps = parseInt(
        repStr.split("reps")[0].trim()
      );
      details.weights = parseFloat(parts[3].split("kg")[0].trim());
      details.duration = parseFloat(parts[4].split("min")[0].trim());
      console.log(details);
      return details;
    }
    return null;
  };
  
     
const calculateCaloriesBurnt = (workoutDetails) =>{
        const durationInMinutes = parseInt(workoutDetails.duration);
        const weightInKg = parseInt(workoutDetails.weights);
        const caloriesBurntPerMinute= 5;
        return Math.round(durationInMinutes * caloriesBurntPerMinute * weightInKg);
    };

    
 

 module.exports ={UserSignin,getDashboard,UserLogin,getWorkoutByDate,addWorkout};


