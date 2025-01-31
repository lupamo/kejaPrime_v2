import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateListing.css';
import Navbar from '../components/Navbar';
import CreateListingHero from '../components/CreateListingHero';

function CreateListing() {
    const [formData, setFormData] = useState({
        image_url: null,
        name: '',
        bedrooms: '',
        price: '',
        location: '',
        description: ''
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image_url: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // get the token from local storage
            const token = localStorage.getItem('access_token');
            const propertyPayload = {
                name: formData.name,
                bedrooms: formData.bedrooms,
                price: formData.price,
                location: formData.location,
                description: formData.description,
            };

            const propertyResponse = await axios.post('http://localhost:8000/api/v1/properties/property', propertyPayload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // pass the token to the server
                },
            });

            const propertyId = propertyResponse.data.id; // Get the property ID from response
            // Upload image_url to the property-specific route
            const imagePayload = new FormData();
            imagePayload.append('file', formData.image_url);

            await axios.post(`http://localhost:8000/api/v1/properties/${propertyId}/images`, imagePayload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('House posted successfully!');
            setFormData({
                image_url: null,
                name: '',
                bedrooms: '',
                price: '',
                location: '',
                description: ''
            });
        } catch (error) {
            console.error('Error posting the house:', error);
            setMessage('Failed to post house. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Navbar />
        <CreateListingHero />
        <div className="container my-5">
            <div className="card shadow-lg">
                <div className="card-header text-center bg-primary text-white">
                    <h3>Create a Listing</h3>
                </div>
                {/* Progress Bar Section */}
                <div className="progress" style={{ height: '10px' }}>
                    <div
                    className={`progress-bar ${loading ? 'progress-bar-striped progress-bar-animated' : ''}`}
                    role="progressbar"
                    style={{
                    width: loading ? '50%' : '100%',
                    backgroundColor: loading ? '#007bff' : '#28a745',
                    }}
                    aria-valuenow={loading ? 50 : 100}
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
            </div>
            <div className="card-body">
                {message && (
                    <div
                    className={`alert ${
                        message.includes('successfully') ? 'alert-success' : 'alert-danger'
                    }`}
                    role="alert"
                >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Property Title
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter property title"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="bedrooms" className="form-label">
                Number of Bedrooms
              </label>
              <select
                className="form-select"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select number of bedrooms
                </option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter property price"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter property location"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Enter a detailed description"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image_url"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Posting...' : 'Submit Listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
        </>
    );
}

export default CreateListing;