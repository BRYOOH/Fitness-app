import cover from '../Assets/gymLarge.jpeg'

const Contact = () => {
  return (
    <div className="flex h-fit items-center gap-4 bg-slate-800 flex-wrap text-white text-[20px]">

      <div 
      className="flex flex-wrap sm:items-center px-6 xl:items-end justify-center flex-col gap-2 flex-[1]">
     
        <h1 className=" uppercase text-[25px] text-tertiary font-bold xl:pr-20 ">Get in touch</h1>
        <p className="text-[20px] font-extrabold flex  ">Please enter your feedback below</p>
       
      
       <form className="flex flex-col flex-wrap gap-3 ">
        <label className="flex flex-col font-bold" >
          Your name
        <input type="text"
        className="px-3 py-6 xl:w-[550px] sm:w-[360px] bg-slate-400 font-normal border-none rounded-[15px] outline-none"/>
        </label>
       <label className="flex flex-col font-bold">
        Your Email
        <input type="text"  
        className="px-3 py-6  xl:w-[550px] sm:w-[360px] bg-slate-400 font-normal text-black border-none rounded-[15px] outline-none"/>
       </label>
        <label className='flex flex-col font-bold'>
          Your Message
        <textarea
         rows={5} 
         className="p-10 border-none outline-none bg-slate-400  rounded-[15px] " 
        />
        </label>
         <button 
         className="p-5 border-none rounded-[15px] min-w-[360px]  max-w-[550px] bg-tertiary outline-none mb-3" 
         onSubmit={""}> 
         Send</button>
       </form>
      </div>

      <div className="flex flex-wrap flex-[1]">
        <div className='flex flex-col  gap-3'>
          <h1 className='text-[25px] font-black text-tertiary uppercase '>Thank you for your feedback</h1>
          <img src={cover} alt=""
          className='h-[500px] w-[600px] object-cover rounded-[10px]'
           />
        </div>
      </div>
    </div>
  )
}

export default Contact