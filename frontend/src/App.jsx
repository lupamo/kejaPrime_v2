import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter } from 'react-router-dom';
// import Routes from './Routes';
function App() {
  
 return (
  <BrowserRouter>
      <Navbar />
  </BrowserRouter>
 )
}

export default App;
