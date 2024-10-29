import { useState } from "react"

const Signin = () => {
  
const [formData,setFormData] = useState({
    email:"",
    password:"",
  });

  const handleSubmit= (e) =>{
  setFormData({...formData,[e.target.name]:e.target.value})
  };

  const validateInputs = () => {
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handelSignIn = async () => {

    console.log("Login successful",formData);
    let responseData;

      await fetch('http://localhost:4000/signin',{
        method: 'POST',
        headers:{
          Accept: 'application/form-data',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(formData)
      }).then((response)=>response.json())
      .then((data)=>responseData=data)
      .catch((err)=>console.log(err)
      )

      console.log(responseData);
    
      if(responseData.success){
        localStorage.setItem('secret-token',responseData.token);
        window.location.replace('/dashboard');
      }else{
        alert(responseData.errors);
      }
      
    }
  
  return (
    <div className=" flex mb-4 flex-col gap-10" >
      <div className="">
      <h1 className="uppercase text-[50px]">Welcome to gym-fit</h1>
      <span className="text-xl text-[30px]">Log in you credentials</span>
      </div>
        <form 
        className=" flex flex-col">
            <label >
                <span>Email</span>
            </label>
            <input 
            name="email"
            value={formData.email}
            onChange={handleSubmit}
            placeholder="Email" 
            type="email" 
            className=" bg-slate-500 xl:h-[60px] h-[40px]  xl:w-[30vw] w-[310px] text-[14px] xl:text-[16px] rounded-[10px] outline-none border-none"/>
            <label>
                <span>Password</span>
            </label>
            <input 
            name="password"
            value={formData.password}
            onChange={handleSubmit}
            placeholder="Password" 
            type="password" 
            className=" bg-slate-500 xl:h-[60px] h-[40px] xl:w-[30vw] w-[310px] text-[14px] xl:text-[16px] rounded-[10px] outline-none"/>
            <button
            onClick={()=>handelSignIn()}
            className="p-3 mt-2 xl:w-[10vw] w-[100px] rounded-[10px] bg-pink-500" >Log in</button>
        </form>
    </div>
  )
}

export default Signin