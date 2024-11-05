import GymRoutine from "../Components/GymRoutine"
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar"
import { useState,useEffect } from "react"
import { useDispatch } from "react-redux"
import { getWorkouts } from "../api"

const Workouts = () => {

  const dispatch = useDispatch();
  const [todayWorkouts, setTodaysWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");

  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getWorkouts(token, date ? `?date=${date}` : "").then((res) => {
      setTodaysWorkouts(res?.data?.todayWorkouts);
      console.log(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getTodaysWorkout();
  }, [date]);
  return (
    <div className="h-full flex items-center bg-slate-800 flex-wrap gap-10 text-white py-4 px-5">
      <div className="flex flex-[1] h-[400px] w-[350px] flex-wrap bg-slate-500"> 
        <h1 className="font-bold text-[20px] p-5 text-tertiary">Pick a date</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
          onChange={(e)=>setDate(`${e.$M + 1}/${e.$D}/${e.$y}`)} 
          className="text-tertiary uppercase"/>
        </LocalizationProvider>
        </div>
      <div className="flex flex-[1] gap-4 flex-wrap">
        {todayWorkouts.map((workout,index)=>(
          <GymRoutine workout={workout}  key={index}/>
        ))}
      </div>
    </div>
  ) 
}

export default Workouts