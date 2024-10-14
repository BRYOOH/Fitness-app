import logo from "../Assets/logo.jpeg"
import cover from "../Assets/gymcover.jpeg"

const Authentication = () => {
  return (
   <div className="h-screen w-screen">
    <div className="flex justify-between">
    <div className="flex-[1] items-center justify-center bg-red-700">
        <img src={logo} alt="" className="h-10 w-10" />
    </div>
    <div className=" flex-[1] items-center justify-between bg-purple-700">   
        <img src={cover} alt="" className="h-40 w-40" /> 
    </div>
    </div>
 
   </div>
  )
}

export default Authentication