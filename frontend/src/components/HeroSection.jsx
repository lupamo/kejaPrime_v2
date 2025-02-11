import React from 'react';
import '../styles/HeroSection.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from '../components/SearchBar';

const HeroSection = ({ onSearch }) => {
  return (
    <div className='hero-section d-flex flex-column justify-content-center align-items-center text-center gap-4'>
      <div className='hero-content'>
          <h1 className='display-4 fw-bold text-white mb-4'>
            Discover Your Perfect Home
          </h1>
          <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
};

export default HeroSection;
