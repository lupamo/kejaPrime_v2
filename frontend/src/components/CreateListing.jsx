import React, { useState } from 'react';
import axios from 'axios';
import '../styles/CreateListing.css';
import Navbar from '../components/Navbar';
import { X, Upload } from 'lucide-react';
import CreateListingHero from '../components/CreateListingHero';
import { useNavigate } from 'react-router-dom';

function CreateListing() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        images: [], // accept multiple images
        name: '',
        price: '',
        location: '',
        description: '',
        bedrooms: ''
    });
    const [previewUrls, setPreviewUrls] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'price' ? (isNaN(parseFloat(value)) ? '' : parseFloat(value)) :
            name === 'bedrooms' ? (isNaN(parseInt(value)) ? '' : parseInt(value)) :
            value // Ensure price is a number
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });

        //preview urls for the images
        const newPreviewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    };
    const removeImage = (index) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);
        
        const newPreviewUrls = [...previewUrls];
        URL.revokeObjectURL(newPreviewUrls[index]); // Clean up the URL
        newPreviewUrls.splice(index, 1);
        
        setFormData({ ...formData, images: newImages });
        setPreviewUrls(newPreviewUrls);
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
                price: formData.price,
                location: formData.location,
                description: formData.description,
                bedrooms: formData.bedrooms
            };
    
            const propertyResponse = await axios.post(
                'https://kejaprime-v2.onrender.com/properties/add',
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
            const imagePayload = new FormData();
            formData.images.forEach((image) => {
                imagePayload.append('files', image);
            });
    
            await axios.post(
                `https://kejaprime-v2.onrender.com/upload?property_id=${propertyId}`,
                imagePayload,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );
    
            setMessage('House posted successfully!');
            setFormData({
                images: [],
                name: '',
                price: '',
                location: '',
                description: '',
                bedrooms: ''
            });
    
            setTimeout(() => {
                navigate('/');
            }, 2000); // 2 seconds delay before redirecting
    
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
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
                                width: loading ? '70%' : '100%',
                                backgroundColor: loading ? '#007bff' : '#28a745',
                            }}
                            aria-valuenow={loading ? 70 : 100}
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
                                <label htmlFor="price" className="form-label">Price per month</label>
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
                                <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    id="bedrooms" 
                                    name="bedrooms" 
                                    value={formData.bedrooms} 
                                    onChange={handleChange} 
                                    placeholder="Enter number of bedrooms" 
                                    required 
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label d-block">Property Images</label>
                                <div className="d-flex gap-3 mb-3 flex-wrap">
                                    {previewUrls.map((url, index) => (
                                        <div 
                                            key={index} 
                                            className="position-relative"
                                            style={{ width: '150px', height: '150px' }}
                                        >
                                            <img
                                                src={url}
                                                alt={`Preview ${index + 1}`}
                                                className="rounded"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle m-1"
                                                onClick={() => removeImage(index)}
                                                style={{ width: '24px', height: '24px', padding: '0' }}
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    <label 
                                        className="d-flex flex-column align-items-center justify-content-center rounded border border-2 border-dashed"
                                        style={{ 
                                            width: '150px', 
                                            height: '150px',
                                            cursor: 'pointer',
                                            backgroundColor: '#f8f9fa'
                                        }}
                                    >
                                        <input
                                            type="file"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            multiple
                                            style={{ display: 'none' }}
                                        />
                                        <Upload className="mb-2" />
                                        <span className="text-muted small">Add Images</span>
                                    </label>
                                </div>
                                <small className="text-muted">
                                    You can add multiple images at once.
                                </small>
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
