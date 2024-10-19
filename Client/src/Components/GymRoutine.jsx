import React from 'react'
import {FitnessCenterRounded, TimelapseRounded} from '@mui/icons-material'

const GymRoutine = () => {
  return (
    <div className='flex flex-[1] flex-wrap xl:flex-nowrap items-center justify-between gap-10'>
      <div className='flex flex-[1] flex-col min-w-[280px] max-w-[350px] px-4 py-5 gap-2 bg-slate-500 rounded-[10px]'> 
        <p className='text-[20px] font-bold p-2'>#Legs</p>
        <p className='text-[15px]'>Burgarian Crush</p>
        <p className='text-[15px]'>Count: Set 10 X 5</p>
        <div className='flex flex-[1] flex-row justify-between '>
        <div><FitnessCenterRounded /> 30KG</div>
        <div><TimelapseRounded/> 30 min</div>
        </div>
        </div>

        <div className='flex flex-[1] flex-col min-w-[280px] max-w-[350px] px-4 py-5 gap-2 bg-slate-500 rounded-[10px]'> 
        <p className='text-[20px] font-bold p-2'>#Legs</p>
        <p className='text-[15px]'>Burgarian Crush</p>
        <p className='text-[15px]'>Count: Set 10 X 5</p>
        <div className='flex flex-[1] flex-row justify-between '>
        <div><FitnessCenterRounded /> 30KG</div>
        <div><TimelapseRounded/> 30 min</div>
        </div>
        </div>

        <div className='flex flex-[1] flex-col min-w-[280px] max-w-[350px] px-4 py-5 gap-2 bg-slate-500 rounded-[10px]'> 
        <p className='text-[20px] font-bold p-2'>#Legs</p>
        <p className='text-[15px]'>Burgarian Crush</p>
        <p className='text-[15px]'>Count: Set 10 X 5</p>
        <div className='flex flex-[1] flex-row justify-between '>
        <div><FitnessCenterRounded /> 30KG</div>
        <div><TimelapseRounded/> 30 min</div>
        </div> 
        </div>

    </div>
       


  )
}

export default GymRoutine