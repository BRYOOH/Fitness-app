import { color } from "framer-motion"

const CardCount = ({item}) => {
  return (
    <div className="flex flex-[1] p-[24px] border-[1px] border-gray-600 rounded-[10px] gap-[6px] shadow-lg">
        <div className="flex flex-[1] flex-col xl:gap-[12px] gap-[6px] "> 
        <h2 className="xl:text-[20px] font-semibold text-[14px] text-tertiary">{item.name}</h2>
        <div className="flex items-end gap-2 text-[18px] sm:text-[22px] "> 2000 
        <span className="text-[14px] mb-2">{item.unit}</span> 
        <span className="mb-2 font-medium xl:text-[18px] sm:text-[12px]" > (+10)</span></div>
        <p className="xl:text-[14px] mb-2 text-[12px] "> {item.desc}</p>
        </div>
        <div className="h-fit p-2 flex items-center justify-center rounded-[12px]" style={{ backgroundColor: item.bg ,color:item.color}}>
            {item.icon}
        </div>
        
    </div>
  )
}

export default CardCount