import { PieChart } from "@mui/x-charts"

const SetPieChart= ({data}) => {
    
  return (
    <div className="flex flex-[1] flex-wrap flex-col border-[1px] bg-slate-500  border-slate-400 rounded-[10px] shadow-lg">
        <h2 className="text-[24px] font-bold uppercase  text-tertiary">Set pattern</h2>
        
        {data?.pieChartData && <PieChart 
          series={[
            {data:data?.pieChartData,
            paddingAngle:4,
            innerRadius:30,
            outerRadius:150,
            cornerRadius:5                
            }
          ]}
          height={300}
         />}
        
    </div> 
  )
}

export default SetPieChart