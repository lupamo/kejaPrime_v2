import React from 'react';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home';
import Listings from './pages/Listings';
import ListtingDetail from './pages/ListingDetail';
<<<<<<< HEAD
<<<<<<< HEAD
import CreateListing from './pages/CreateListing';
=======
import Profile from './pages/Profile';
>>>>>>> a2f3e45f911d387de4af3c8a15b09a964dad910b
=======
import Profile from './pages/Profile';
>>>>>>> a2f3e45f911d387de4af3c8a15b09a964dad910b
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';


function App() {
  
 return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createListing" element={<CreateListing />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListtingDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
  </BrowserRouter>
 )
}

export default App;
