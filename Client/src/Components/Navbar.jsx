import {Link} from 'react-router-dom'
import logo from "../Assets/logo.png"
import { useDispatch } from 'react-redux'
import {logout} from "../redux/userSlice" 


const Navbar = ({currentUser}) => { 

  const dispatch = useDispatch()
  return (
    <div className="h-[80px] bg-slate-600 flex items-center justify-between
     text-[16px] sticky top-0 z-10 text-white border-b-2 border-slate-400"> 
        <div className="px-5 flex items-center gap-2 text-[16px] max-w-[1400px]">
        <Link to='/'>
        <img src={logo} alt="" className='h-[70px] w-[90px]'/>
        </Link>
        <span className='uppercase text-[18px] text-blue-600 font-bold' >Gym fit</span>
        </div>
        <div className='xl:flex items-center gap-20 px-10 hidden'>
            <Link to='/' 
            className='cursor-pointer font-bold hover:text-blue-600 active:border-b-4 active:border-tertiary'>
            Dashboard
            </Link>
            <Link to='/workouts' 
            className='cursor-pointer font-bold hover:text-blue-600 active:border-b-4 active:border-tertiary'>
            Workouts
            </Link>
            <Link to='/blogs' 
            className='cursor-pointer font-bold hover:text-blue-600 active:border-b-4 active:border-tertiary'>
            Blogs
            </Link>
            <Link to='/contact'
            className='cursor-pointer font-bold hover:text-blue-600 active:border-b-4 active:border-tertiary'
            >
            Contact
            </Link>
        </div>
        <div className='px-10'>
        <button onClick={()=>dispatch(logout())}> Logout</button>
        </div> 
    </div>
  )
}

export default Navbar