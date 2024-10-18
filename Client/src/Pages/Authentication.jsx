import logo from "../Assets/logo.png"
import cover from "../Assets/gymcover.jpeg"
import { useState } from "react"
import Signin from "../Components/Signin";
import Signup from "../Components/Signup";

const Authentication = () => {

  const[login,setLogin] = useState(false);
  return (
   <div className="h-screen w-screen overflow-hidden text-white">
    <div className="flex h-full">
    <div className="flex-[1] xl:flex hidden">
        <img src={logo} alt="" className="top-[20px] left-[30px] object-contain  cursor-pointer z-10 absolute " />
        <img src={cover} alt="" className="relative object-contain top-[80px] " /> 
    </div>
    <div className="flex-[1] flex flex-col p-[40px] gap-[16px] xl:items-baseline items-center justify-center ">   
        {login?
        <><Signin /><p className="text-[16px] text-center mt-[16px] sm:text-[14px]">Dont have an account?
              <span className="text-blue-500 cursor-pointer font-bold" onClick={() => setLogin(false)}>Sign up </span></p></>:
        <><Signup /><p className="text-[16px] text-center mt-[16px] sm:text-[14px]">Already have an account?
              <span className="text-blue-500 cursor-pointer font-semibold" onClick={() => setLogin(true)}>Sign in</span></p></>}
    </div>
   
   </div>
   </div>
  )
}

export default Authentication