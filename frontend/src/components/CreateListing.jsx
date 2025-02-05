import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateListing.css';
import Navbar from '../components/Navbar';
import CreateListingHero from '../components/CreateListingHero';

function CreateListing() {
    const [formData, setFormData] = useState({
        images: [], // accept multiple images
        name: '',
        price: '',
        location: '',
        description: ''
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'price' ? parseFloat(value) : value // Ensure price is a number
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                throw new Error("Authorization token is missing.");
            }

            // Step 1: Post property details
            const propertyPayload = {
                name: formData.name,
                price: formData.price, // Price should already be a number
                location: formData.location,
                description: formData.description,
            };

            const propertyResponse = await axios.post(
                'http://localhost:8000/properties/add', // API Endpoint to add a house
                propertyPayload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );

            const propertyId = propertyResponse.data?.id;
            if (!propertyId) {
                throw new Error("Property ID not returned from API.");
            }

            // Step 2: Upload multiple images
            for (const image of formData.images) {
                const imagePayload = new FormData();
                imagePayload.append('property_id', String(propertyId)); // Ensure property_id is a string
                imagePayload.append('file', image);

                await axios.post(
                    'http://localhost:8000/properties/upload', // API Endpoint to upload images
                    imagePayload,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${token}`
                        },
                    }
                );
            }

            setMessage('House posted successfully!');
            setFormData({
                images: [],
                name: '',
                price: '',
                location: '',
                description: ''
            });
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data); // Log detailed error from server
            } else {
                console.error('Error:', error);
            }
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
                                className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}
                                role="alert"
                            >
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter property title" required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} placeholder="Enter property price" required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">Location</label>
                                <input type="text" className="form-control" id="location" name="location" value={formData.location} onChange={handleChange} placeholder="Enter property location" required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="Enter a detailed description" required></textarea>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Upload Images</label>
                                <input type="file" className="form-control" id="image" name="images" onChange={handleImageChange} accept="image/*" multiple required />
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btn btn-primary" disabled={loading}>
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
