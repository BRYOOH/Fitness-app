import React from 'react'
import {FitnessCenterRounded, TimelapseRounded} from '@mui/icons-material'

const GymRoutine = ({workout}) => {
  return (
    <div className='flex flex-[1] flex-wrap xl:flex-nowrap items-center justify-between gap-10'>
      <div className='flex flex-[1] flex-col min-w-[280px] max-w-[350px] px-4 py-5 gap-2 bg-slate-500 rounded-[10px]'> 
        <p className='text-[20px] font-bold p-2'># {workout?.category}</p>
        <p className='text-[15px]'>{workout?.workoutName}</p>
        <p className='text-[15px]'>Count { workout?.sets} X {workout?.reps}</p>
        <div className='flex flex-[1] flex-row justify-between '>
        <div><FitnessCenterRounded /> {workout?.weights}KG</div>
        <div><TimelapseRounded/> {workout?.duration} min</div>
        </div>
        </div>
    </div>
       


  )
}

export default GymRoutine