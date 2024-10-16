import { Component, useState } from 'react';
import {BrowserRouter, Route, Routes }from "react-router-dom"
import Authentication from './Components/Authentication';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import Workouts from './Components/Workouts';
import Contact from './Components/Contact';

function App() {
    const[user,setUser] = useState(true);
    return (
     < >
     <div className='bg-slate-900'>
      <BrowserRouter>
      {user?<Navbar/>:<Authentication/>}
      <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/workouts' element={<Workouts/>}/>
      <Route path='/contact' element={<Contact/>}/>
      </Routes>
      </BrowserRouter>
      </div>
      </>
     
    
    );
  }


export default App;
