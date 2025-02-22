import React from 'react';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './pages/Home';
import Listings from './pages/Listings';
import { AuthProvider } from "./utils/AuthContext";
import ListtingDetail from './pages/ListingDetail';
import Profile from './pages/Profile';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import CreateListing from './components/CreateListing';
import AboutUs from './pages/AboutUs';
import ForgotPassword from './components/ForgotPassword';


function App() {
  
 return (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createListing" element={<CreateListing />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<ListtingDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
  </BrowserRouter>
  </AuthProvider>
 )
}

export default App;
