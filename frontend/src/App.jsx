import React from 'react';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListtingDetail from './pages/ListingDetail';
import CreateListing from './pages/CreateListing';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';


function App() {
  
 return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createListing" element={<CreateListing />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListtingDetail />} />
      </Routes>
  </BrowserRouter>
 )
}

export default App;
