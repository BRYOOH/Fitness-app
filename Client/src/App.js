import { Component, useState } from 'react';
import {BrowserRouter, Route, Routes }from "react-router-dom"
import Authentication from './Pages/Authentication';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import Workouts from './Pages/Workouts';
import Contact from './Pages/Contact';
import Blogs from './Pages/Blogs';

function App() {
    const[user,setUser] = useState(true);
    return (
     < >
     <div className='bg-slate-800'>
      <BrowserRouter>
      {user?<Navbar/>:<Authentication/>}
      <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/workouts' element={<Workouts/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/blogs' element={<Blogs/>}/>
      </Routes>
      </BrowserRouter>
      </div>
      </>
     
    
    );
  }


export default App;
