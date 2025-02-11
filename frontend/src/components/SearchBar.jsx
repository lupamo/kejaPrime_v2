import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [bedrooms, setBedrooms] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({ location, bedrooms });
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-group">
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-control"
            placeholder="Enter location"
          />
          <input
            type="number"
            name="bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="form-control"
            placeholder="Bedrooms"
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
