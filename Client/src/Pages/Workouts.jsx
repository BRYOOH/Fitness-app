import GymRoutine from "../Components/GymRoutine"
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {DateCalendar} from "@mui/x-date-pickers/DateCalendar"
const Workouts = () => {
  return (
    <div className="h-full flex items-center bg-slate-800 flex-wrap gap-10 text-white py-4 px-5">
      <div className="flex flex-[1] h-[400px] w-[350px] flex-wrap bg-slate-500"> 
        <h1 className="font-bold text-[20px] p-5 text-tertiary">Pick a date</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar className="text-tertiary uppercase"/>
        </LocalizationProvider>
        </div>
      <div className="flex flex-[1] gap-4 flex-wrap">
        <GymRoutine/>
        <GymRoutine/>
        <GymRoutine/>

      </div>
    </div>
  )
}

export default Workouts