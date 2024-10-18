import { counts } from "../Assets/data"
import CardCount from "../Components/CardCount"
import GymRoutine from "../Components/GymRoutine";
import SetPieChart from "../Components/SetPieChart";
import WeeklyStats from "../Components/WeeklyStats";

const Dashboard = () => {
  const data={
      totalCaloriesBurnt: 13500,
      totalWorkouts:6,
      avgCaloriesBurntPerWorkout:2250,
      totalWeeksCaloriesBurnt:{
        weeks:[
          "17th",
          "18th",
          "19th",
          "20th",
          "21st",
          "22th",
          "23th"
        ],
        caloriesBurned:[
          "10500",
          "0",
          "0",
          "0",
          "0",
          "0",
          "13500"
        ]
      },
      pieChartData:[
      {
        id:0,
        value:6000,
        label:"Legs"
      },
      {
        id:1,
        value:1500,
        label:"Back"
      },
      {
        id:2,
        value:3750,
        label:"Shoulder"
      },
      {
        id:3,
        value:2250,
        label:"ABS"
      },
    ]
    };

  return (
    <div className="h-fit flex flex-wrap text-white py-[22px]">
      <h1 className="text-[30px] font-bold p-3">Dashboard</h1>
    <div className="flex flex-wrap items-center justify-between px-5 mt-5 w-full">
    {counts.map((item,index)=>(
      <CardCount key={index} data={data} item={item}/>
    ))}
    </div>    
    <div className="flex flex-wrap items-center w-[650px] justify-between px-4 mt-5">
     <WeeklyStats data={data}/>
    </div>
    <div className="flex flex-wrap w-[700px] items-center justify-between mt-5 px-4 ">
     <SetPieChart data={data}/>
    </div>
    <div className="flex flex-wrap flex-col justify-center gap-4 px-4 mt-5">
      <textarea 
      rows={5} 
      placeholder="Enter in this order"
      className=" border-none text-[16px] p-8 bg-slate-400 rounded-[10px] text-black"
      />
      <button className="bg-tertiary px-8 py-4 border-none rounded-[10px]"> SEND</button>
    </div>
    <div className="flex flex-wrap items-center w-[500px] justify-between px-4 mt-5">
      <h2 className="uppercase font-bold text-[24px] text-tertiary">Today's Workout</h2>
     <GymRoutine/>
    </div>
    </div>
  )
}

export default Dashboard