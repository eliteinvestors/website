import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loginpage from './components/Loginpage';
import Home from './components/Home';
import { useEffect } from 'react';
import {auth} from './components/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Review from './components/Review';
import About from './components/about';

function App() {
      


return(

  <BrowserRouter>
      <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/review" element={<Review/>} />
            <Route path="/about" element={<About/>} />

            <Route path="/" element={<Loginpage/>} />
      </Routes>
   </BrowserRouter>   

);

}

export default App;