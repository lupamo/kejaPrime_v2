import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Newlistings from './components/Newlistings';
import { BrowserRouter } from 'react-router-dom';
// import Routes from './Routes';
function App() {
  
 return (
  <BrowserRouter>
      <Navbar />
      <Newlistings />
  </BrowserRouter>
 )
}

export default App;
