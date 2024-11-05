import { useEffect, useState } from "react";
import { counts } from "../Assets/data"
import CardCount from "../Components/CardCount"
import GymRoutine from "../Components/GymRoutine";
import SetPieChart from "../Components/SetPieChart";
import WeeklyStats from "../Components/WeeklyStats";
import { addWorkout, getDashboardDetails, getWorkouts } from "../api";

const Dashboard = () => {
  const [loading , setLoading] = useState(false);
  const [buttonLoadng,setButtonLoading] = useState(false);
   const [data , setData] = useState();
   const [todayWorkouts, setTodaysWorkout] = useState([]);
   const [workout, setWorkout] = useState(`
    #Legs
    Back Squat
    5 sets X 15 reps
    30 kg
    10 min`);

    const dashboardData = async() =>{
      setLoading(true);
      const token = localStorage.getItem("fittrack-app-token")
      await getDashboardDetails(token).then((res)=>{
        setData(res.data);
        console.log(res.data);
       setLoading(false);
      });
    };

    const getTodaysWorkout = async() =>{
      setLoading(true);
      const token = localStorage.getItem("fittrack-app-token");
      await getWorkouts(token,"").then((res)=>{
        setTodaysWorkout(res?.data?.todayWorkouts);
        console.log(res.data);
        setLoading(false);
      });
    };

    const addNewWorkout = async() =>{
      setButtonLoading(true);
      const token = localStorage.getItem("fittrack-app-token");
      await addWorkout(token,{workoutString:workout})
      .then((res)=>{
        setWorkout(res?.data?.workout);
        dashboardData();
        getTodaysWorkout();
        setButtonLoading(false);
      })
      .catch((err)=>{
        alert(err);
      })
    }

    useEffect(()=>{
      dashboardData();
      getTodaysWorkout();
    },[]);


  return (
    <div className="h-[100%] flex flex-[1] bg-slate-800 text-white py-[22px] overflow-y-scroll">
     <div className="flex-[1] max-w-[1400px] flex flex-col xl:gap-5 gap-3">
     <h1 className="text-[30px] text-tertiary font-bold p-3">Dashboard</h1>
    <div className="flex flex-wrap justify-between py-5 mt-5 xl:gap-5 gap-3">
    {counts.map((item,index)=>(
      <CardCount key={index} data={data} item={item}/>
    ))}
    </div>    
    <div className="flex flex-wrap justify-between py-5 mt-5 xl:gap-5 gap-3">
     <WeeklyStats data={data}/>
     <SetPieChart data={data}/>
   
    <div className="flex flex-[1] flex-col min-w-[280px] xl:p-6 p-4 border-[1px] rounded-[10px] border-tertiary gap-2">
      <h2 className="font-semibold text-[16px] text-tertiary">Add New Workout</h2>
      <textarea 
      rows={5} 
      value={workout}
      onChange={(e)=>setWorkout(e.target.value)}
      placeholder="Enter in this order"
      className=" border-none text-[16px] p-8 bg-slate-400 rounded-[10px] text-black"
      />
      <button 
      onClick={()=>addNewWorkout()}
      className="bg-tertiary px-8 py-4 border-none rounded-[10px]"> SEND</button>
    </div>
    <div className="flex flex-col justify-between xl:gap-5 py-4 gap-3">
      <h2 className="uppercase font-bold text-[24px] text-tertiary">Today's Workout</h2>
      <div className="flex flex-wrap justify-center xl:gap-5 mb-[100px] gap-3">

        {todayWorkouts.map((workout,index)=>(
          <GymRoutine workout={workout} key={index}/>
        ))}
      </div>

    </div>
    </div>
     </div>
    </div>
  )
}

export default Dashboard