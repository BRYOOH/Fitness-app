import { BarChart } from "@mui/x-charts/BarChart"

const WeeklyStats = ({data}) => {
    
  return (
    <div className="flex flex-[1] flex-wrap  h-[fit] flex-col border-[1px] bg-slate-500 border-slate-400 p-6 rounded-[10px] shadow-lg">
        <h2 className="text-[24px] font-bold uppercase text-tertiary">Weekly Statistics</h2>
        
        {data?.totalWeeksCaloriesBurnt && <BarChart xAxis={[
            {scaleType:"band",
            data: data?.totalWeeksCaloriesBurnt?.weeks
        }
         ]}
         series={[{data:data?.totalWeeksCaloriesBurnt?.caloriesBurnt}]}
         height={300}

        className="text-tertiary"
         />}
        
    </div> 
  )
}

export default WeeklyStats