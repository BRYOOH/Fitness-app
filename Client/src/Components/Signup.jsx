import { useState } from "react"
import {UserSignUp} from '../api/index'
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userSlice";


const Signup = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateInputs = () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handelSignUp = async (e) => {
    e.preventDefault();

    setLoading(true);
    setButtonDisabled(true);
    if (validateInputs()) { 
      await UserSignUp({ name, email, password }) 
        .then((res) => {
          dispatch(loginSuccess(res.data));
          alert("Account Created Success");
          setLoading(false);
          setButtonDisabled(false);
        })
        .catch((err) => {
          alert(err.response.data.message);
          setLoading(false);
          setButtonDisabled(false);
        });
    }
  };
    return (
      <div className=" flex flex-col mb-4 gap-10" >
        <div>
          <h1 className="uppercase text-[50px]">Welcome to gym-fit</h1>
          <span className="text-[30px]">Enter to you details below</span>
        </div>
          <form 
          onSubmit={handelSignUp()}
          className=" flex flex-col">
             <label >
                <span>Email</span>
              </label>
              <input placeholder="Email" 
              type="email" 
              name="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className=" bg-slate-500 xl:h-[60px] h-[40px]  xl:w-[30vw] w-[310px] text-[14px] xl:text-[16px] rounded-[10px] outline-none border-none"/>
              <label >
                  <span>Username</span>
              </label>
              <input placeholder="Username"
              name="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              type="text" 
              className=" bg-slate-500 xl:h-[60px] h-[40px]  xl:w-[30vw] w-[310px] text-[14px] xl:text-[16px] rounded-[10px] outline-none border-none"/>
              <label>
                  <span>Password</span>
              </label>
              <input placeholder="Password"
              name="password" 
              value={password} 
            onChange={(e) => setPassword(e.target.value)}
              type="password"  
              className=" bg-slate-500 xl:h-[60px] h-[40px] xl:w-[30vw] w-[310px] text-[14px] xl:text-[16px] rounded-[10px] outline-none"/>
              <button 
              type="submit"
              className="p-3 mt-2 xl:w-[10vw] w-[100px] rounded-[10px] bg-pink-500" >Sign up</button>
          </form>
      </div>
    )
  }
  
  export default Signup