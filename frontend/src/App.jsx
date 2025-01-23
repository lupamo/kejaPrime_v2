import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Value from './components/Value';
import { BrowserRouter } from 'react-router-dom';
// import Routes from './Routes';
function App() {
  
 return (
  <BrowserRouter>
      <Navbar />
      <HeroSection />
      <Value />
  </BrowserRouter>
 )
}

export default App;
