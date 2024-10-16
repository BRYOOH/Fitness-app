const Signup = () => {

    return (
      <div className=" flex flex-col mb-4 gap-10" >
        <div>
          <h1 className="uppercase text-[50px]">Welcome to gym-fit</h1>
          <span className="text-[30px]">Enter to you details below</span>
        </div>
          <form className=" flex flex-col">
             <label >
                <span>Email</span>
              </label>
              <input placeholder="Email" type="text" 
              className=" bg-slate-500 xl:h-[60px] h-[40px]  xl:w-[30vw] w-[310px] text-[14px] xl:text-[16px] rounded-[10px] outline-none border-none"/>
              <label >
                  <span>Username</span>
              </label>
              <input placeholder="Username" type="text" 
              className=" bg-slate-500 xl:h-[60px] h-[40px]  xl:w-[30vw] w-[310px] text-[14px] xl:text-[16px] rounded-[10px] outline-none border-none"/>
              <label>
                  <span>Password</span>
              </label>
              <input placeholder="Password" type="password"  
              className=" bg-slate-500 xl:h-[60px] h-[40px] xl:w-[30vw] w-[310px] text-[14px] xl:text-[16px] rounded-[10px] outline-none"/>
              <button className="p-3 mt-2 xl:w-[10vw] w-[100px] rounded-[10px] bg-pink-500" >Log in</button>
          </form>
      </div>
    )
  }
  
  export default Signup