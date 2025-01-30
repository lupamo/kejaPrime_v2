import React from 'react'
import '../styles/HeroSection.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const HeroSection = () => {
  return (
    <div className='hero-section d-flex justify-content-center align-items-end gap-7 z-20'>
        <div className='hero-title container text-center mb-5 p-4'>
            <h1 className='display-4 fw-bold text-white fw-bold  mb-4 hero-title'>
                Discover your Perfect Home
            </h1>
            <div className='search-bar d-flex justify-content-center'>
                <input type="text" 
                    className='form-control me-2'
                    placeholder=' Search a house'
                    style={{ maxWidth:'400px' }}
                />
                <button 
                    className='btn' 
                    style={{
                        backgroundColor: 'darkorange',
                        borderColor: 'darkorange',
                        color: 'white',
                    }}
                >
                    Find
                </button>
            </div>
        </div>
    </div>
  )
}

export default HeroSection
