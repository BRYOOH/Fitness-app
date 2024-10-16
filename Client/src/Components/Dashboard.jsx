import { counts } from "../Assets/data"
import CardCount from "./CardCount"

const Dashboard = () => {
  return (
    <div className="h-screen text-white py-[22px]">
        <h1 className="text-[20px] font-bold">Dashboard</h1>
    <div className="flex flex-wrap items-center justify-between px-4 mt-5">
    {counts.map((item,index)=>(
      <CardCount key={index} item={item}/>
    ))}
    </div>    
    </div>
  )
}

export default Dashboard