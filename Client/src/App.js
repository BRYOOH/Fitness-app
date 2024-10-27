import { Component, useState } from 'react';
import {BrowserRouter, Route, Routes }from "react-router-dom"
import Authentication from './Pages/Authentication';
import Navbar from './Components/Navbar';
import Dashboard from './Pages/Dashboard';
import Workouts from './Pages/Workouts';
import Contact from './Pages/Contact';
import Blogs from './Pages/Blogs';
import {useSelector} from "react-redux";

function App() {
    const{currentUser} = useSelector((state)=>state.user);
    return (
     < >
     <div className='bg-slate-800'>
      <BrowserRouter>
      {currentUser?(
        <div className=''>
      <Navbar currentUser={currentUser}/>
      <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/workouts' element={<Workouts/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/blogs' element={<Blogs/>}/>
      </Routes>
        </div>
       )
      :(
        <div className=''> 
        <Authentication/>
        </div>
     
      )}
      </BrowserRouter>
      </div>
      </>
     
    
    );
  }


export default App;
