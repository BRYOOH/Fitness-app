import { useState } from "react"
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";
import { UserSignIn } from "../api/index";

const Signin = () => {
  
  const dispatch = useDispatch(); 
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] =useState("");

  const validateInputs = () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSignin = async (e) => {
  
    e.preventDefault();
    setLoading(true);
    setButtonDisabled(true);

    if (validateInputs()) { 
      await UserSignIn({email,password})
        .then((res) => {
          if(res && res.data){
            dispatch(loginSuccess(res.data));
            alert("Login successfully");
            setLoading(false);
            setButtonDisabled(false);
          }else{
            console.log(res,"response error");
          }
         
        })
        .catch((err) => {
          alert(err.response.data.message);
          setLoading(false);
          setButtonDisabled(false);
        });
    }
  };
  
  return (
    <div className=" flex mb-4 flex-col gap-10" >
      <div className="">
      <h1 className="uppercase text-[50px]">Welcome to gym-fit</h1>
      <span className="text-xl text-[30px]">Log in you credentials</span>
      </div>
        <form 
        onSubmit={handleSignin}
        className=" flex flex-col">
            <label >
                <span>Email</span>
            </label>
            <input 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email" 
            type="email" 
            className=" bg-slate-500 xl:h-[60px] h-[40px]  xl:w-[30vw] w-[310px] text-[14px] xl:text-[16px] rounded-[10px] outline-none border-none"/>
            <label>
                <span>Password</span>
            </label>
            <input 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="Password" 
            type="password" 
            className=" bg-slate-500 xl:h-[60px] h-[40px] xl:w-[30vw] w-[310px] text-[14px] xl:text-[16px] rounded-[10px] outline-none"/>
            <button
            type="submit"
            className="p-3 mt-2 xl:w-[10vw] w-[100px] rounded-[10px] bg-pink-500" >Log in</button>
        </form>
    </div>
  )
}

export default Signin