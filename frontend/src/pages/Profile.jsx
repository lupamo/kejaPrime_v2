import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { listings } from '../components/ListingsCards';
import Navbar from '../components/Navbar';
import defaultProfilePic from '../assets/images/sorry.png'; // Add a default profile picture
import cameraIcon from '../assets/images/camera.png'; // Add a default profile picture


const Profile = () => {
    const bookmarkedListings = JSON.parse(localStorage.getItem('bookmarkedListings')) || [];

    // Filter listings to only include bookmarked ones
    const bookmarkedItems = listings.filter((listing) => bookmarkedListings.includes(listing.id));

    // Dummy user data
    const [user, setUser] = useState({
        name: 'John Doe',
        location: 'Nairobi, Kenya',
        profilePicture: defaultProfilePic,
        listedHouses: listings.slice(0, 3), // Example: First 3 listings as user's listed houses
    });

    // State to manage the active tab
    const [activeTab, setActiveTab] = useState('details');

    const triggerFileInput = () => {
        document.getElementById('profile-picture-upload').click();
    };

    // Handle profile picture change
    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUser({ ...user, profilePicture: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                {/* Profile Picture and Name Section */}
                <div className="text-center mb-4">
                    <div className="position-relative d-inline-block">
                        <img
                            src={user.profilePicture}
                            alt="Profile"
                            className="rounded-circle"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <img
                            src={cameraIcon}
                            alt="camera upload"                        
                            htmlFor="profile-picture-upload"
                            className="position-absolute bottom-0 end-0 rounded-circle"
                            style={{ cursor: 'pointer', width: '30px', height: '30px'}}
                            onClick={triggerFileInput}
                        />
                        
                        <input
                            type="file"
                            id="profile-picture-upload"
                            onChange={handleProfilePictureChange}
                            style={{ display: 'none' }}
                            accept="image/*"
                            
                        />
                    </div>
                    <h3 className="mt-3">{user.name}</h3>
                </div>

                {/* Tabbed Navigation */}
                <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
                            onClick={() => setActiveTab('details')}
                            style={{color: '#000'}}
                        >
                            User Details
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'listed' ? 'active' : ''}`}
                            onClick={() => setActiveTab('listed')}
                            style={{color: '#000'}}
                        >
                            Listed Houses
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'bookmarks' ? 'active' : ''}`}
                            onClick={() => setActiveTab('bookmarks')}
                            style={{color: '#000'}}

                        >
                            Bookmarks
                        </button>
                    </li>
                </ul>

                {/* User Details Section */}
                {activeTab === 'details' && (
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4 className="card-title" style={{color:'#203856'}}>User Details</h4>
                            <p className="card-text">
                                <strong>Name:</strong> {user.name}
                            </p>
                            <p className="card-text">
                                <strong>Location:</strong> {user.location}
                            </p>
                        </div>
                    </div>
                )}

                {/* Listed Houses Section */}
                {activeTab === 'listed' && (
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4 className="card-title" style={{color:'#203856'}}>Listed Houses</h4>
                            <div className="row">
                                {user.listedHouses.length > 0 ? (
                                    user.listedHouses.map((listing) => (
                                        <div className="col-xl-4 mb-4" key={listing.id}>
                                            <div className="card shadow-sm">
                                                <img
                                                    src={listing.image[0]}
                                                    alt={listing.name}
                                                    className="card-img-top"
                                                    style={{ height: '200px', objectFit: 'cover' }}
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{listing.name}</h5>
                                                    <p className="card-text">{listing.location}</p>
                                                    <p className="card-text">{listing.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No houses listed.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Bookmarks Section */}
                {activeTab === 'bookmarks' && (
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4 className="card-title" style={{color:'#203856'}}>Bookmarks</h4>
                            <div className="row">
                                {bookmarkedItems.length > 0 ? (
                                    bookmarkedItems.map((listing) => (
                                        <div className="col-xl-4 mb-4" key={listing.id}>
                                            <div className="card shadow-sm">
                                                <img
                                                    src={listing.image[0]}
                                                    alt={listing.name}
                                                    className="card-img-top"
                                                    style={{ height: '200px', objectFit: 'cover' }}
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{listing.name}</h5>
                                                    <p className="card-text">{listing.location}</p>
                                                    <p className="card-text">{listing.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No bookmarks found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Profile;