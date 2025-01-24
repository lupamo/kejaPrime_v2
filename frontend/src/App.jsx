import React from 'react';
import './App.css';
// import Routes from './Routes';
import Home from './pages/Home';
import Listings from './pages/Listings';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';


function App() {
  
 return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
      </Routes>
  </BrowserRouter>
 )
}

export default App;
