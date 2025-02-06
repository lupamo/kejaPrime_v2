import React from 'react'

import '../styles/CreateListingHero.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateListingHero = () => {
  return (
    <div className='listing-section d-flex justify-content-center align-items-end pt-5 gap-7 z-20'>
        <div className='listing-title container text-center mb-5 p-4'>
            <h1 className='display-4 text-white  mb-4 hero-title'>
                Create A Listing
            </h1>
            <p className='lead text-white'>Post a house to show tenants that it is available</p>
        </div>
    </div>
  )
}

export default CreateListingHero;
