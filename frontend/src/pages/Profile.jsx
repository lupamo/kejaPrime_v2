import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from '../components/Navbar';
import axios from 'axios';
import BookmarkButton from "../components/BookmarkButton";
import { Trash2 } from 'lucide-react';
import { AuthContext } from '../utils/AuthContext';
import defaultProfilePic from '../assets/images/sorry.png'; // Add a default profile picture
import { Camera } from 'lucide-react';


const Profile = () => {
    const { user, token, isLoggedIn, setUser } = useContext(AuthContext);
    const [listedHouses, setListedHouses] = useState([]);
    const [previewUrl, setPreviewUrl] = useState(user?.profile_pic || defaultProfilePic);
    const [isUploading, setIsUploading] = useState(false);
    const [bookmarkedItems, setBookmarkedItems] = useState([]);
    const [bookmarkedIds, setBookmarkedIds] = useState([]);
    const [activeTab, setActiveTab] = useState('details');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    //fetch listed houses from backend
    const fetchListedHouses = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/properties/me', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Listed houses response:', response.data);
            setListedHouses(response.data);
        } catch (error) {
            console.error('Error fetching listed houses:', error);
            // setError('Failed to load listed houses');
        } finally {
            setLoading(false);
        }
    };

     // Fetch user data after profile picture update
     const fetchUpdatedUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data); // Update the global user state
        } catch (error) {
            console.error('Error fetching updated user data:', error);
            setError('Failed to fetch updated user data');
        }
    };

    // Add this useEffect to update preview when user data changes
    useEffect(() => {
        if (user?.profile_pic) {
            setPreviewUrl(user.profile_pic);
        }
    }, [user?.profile_pic]);

    //fetch bookmarked items from backend
    const fetchBookmarkedItems = async () => {
        setLoading(true);
        try {
            const bookmarksResponse = await axios.get('http://localhost:8000/bookmarks/', {
                headers:  
                { Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
                },
            });

            // Store bookmark IDs for easy access
            const bookmarkMap = new Map(
                bookmarksResponse.data.map(bookmark => [bookmark.property_id, bookmark.id])
            );
            setBookmarkedIds(bookmarkMap);


            //fetching the full details for each bookmarked property
            const propertyPromises = bookmarksResponse.data.map(bookmark => 
                axios.get(`http://localhost:8000/properties/${bookmark.property_id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            );
            const propertyResponses = await Promise.all(propertyPromises);
            const bookmarkedProperties = propertyResponses.map(response => response.data);

            setBookmarkedItems(bookmarkedProperties);

        } catch (error) {
            console.error('Error fetching bookmarks:', error);
            setError(error.response?.data?.detail || 'Failed to fetch bookmarks');
        } finally {
            setLoading(false);
        }
    };

    // Toggle bookmark function
    const toggleBookmark = async (propertyId) => {
        if (!isLoggedIn || !token) {
            setError("Please login to manage bookmarks");
            return;
        }

        try {
            const config = {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            const bookmarkId = bookmarkedIds.get(propertyId);
            await axios.delete(
                `http://localhost:8000/bookmarks/delete/${bookmarkId}`,
                config
            );

            // Update the bookmarked items list
            setBookmarkedItems(prev => prev.filter(item => item.id !== propertyId));
            setBookmarkedIds(prev => {
                const newMap = new Map(prev);
                newMap.delete(propertyId);
                return newMap;
            });

        } catch (error) {
            console.error("Error removing bookmark:", error);
            setError(error.response?.data?.detail || "Failed to remove bookmark");
        }
    };
    //Fetch data when the tabs change

    useEffect(() => {
        if(token) {
            if (activeTab === 'listed') {
                fetchListedHouses();
            } else if (activeTab === 'bookmarks') {
                fetchBookmarkedItems();
            }
        }
    }, [activeTab, token]);

    //update profile picture preview when user changes profile picture
    useEffect(() => {
        setPreviewUrl(user?.profile_pic || defaultProfilePic);
    }, [user?.profile_pic]);

    //Handle profile picture change
    const handleProfilePictureChange = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        //create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
        
        setIsUploading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8000/users/avatar',
                data: formData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data?.data?.publicUrl) {
                const newProfilePicUrl = response.data.data.publicUrl;
                setPreviewUrl(newProfilePicUrl);

                // Fetch updated user data after profile picture update
                setUser(prevUser => ({
                    ...prevUser,
                    profile_pic: newProfilePicUrl
                }));
                
                await fetchUpdatedUserData();

            }
        } catch (error) {
            console.error('Upload error:', error);
            setError('Failed to update profile picture');
            setPreviewUrl(user?.profile_pic || defaultProfilePic);
        } finally {
            setIsUploading(false);
        }

    };

    //handle delete listing
    const handleDeleteProperty = async (propertyId) => {
        if (!token) {
            setError('Please login to delete listings');
            return;
        }
        //confrmation before deletion
        const isConfirmed = window.confirm("Are you sure you want to delete this listing? This action cannot be undone.");
    
        if (!isConfirmed) {
            return; // If user clicks Cancel, do nothing
        }

        try {
            await axios.delete(`http://localhost:8000/properties/${propertyId}`, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setListedHouses(prev => prev.filter(listing => listing.id !== propertyId));
        } catch (error) {
            console.error('Error deleting property:', error);
            setError(error.response?.data?.detail || 'Failed to delete property');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                {/* Profile Picture and Name Section */}
                <div className="text-center mb-4">
                    <div className="position-relative d-inline-block">
                        <div 
                            className='rounded-circle overflow-hidden'
                            style={{ 
                                width: '150px', 
                                height: '150px',
                                position: 'relative'
                            }}
                        >
                             <img
                                src={previewUrl}
                                alt="Profile"
                                className="w-100 h-100"
                                style={{ 
                                    objectFit: 'cover',
                                }}
                                onError={(e) => {
                                    e.target.src = defaultProfilePic;
                                }}
                            />
                            {isUploading && (
                            <div 
                                className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
                                style={{ 
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                                }}
                            >
                                <div className="spinner-border text-white" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                            )}
                        </div>
                        
                        <label 
                            htmlFor="profile-picture-upload" 
                            className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition-colors"
                            style={{
                                bottom: '5px',
                                right: '5px',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                padding: '8px',
                                cursor: 'pointer',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                transition: 'transform 0.2s',
                                zIndex: 2
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <Camera size={20} className="text-gray-600" />
                        </label>
                        
                        <input
                            type="file"
                            id="profile-picture-upload"
                            onChange={handleProfilePictureChange}
                            className="d-none"
                            accept="image/*"
                        />
                        
                        {error && (
                            <div className="alert alert-danger mt-2">
                                {error}
                            </div>
                        )}
                    </div>
                    <h3 className="mt-3">{user?.username || 'User'}</h3>
                    {/* <p className="text-muted">{user?.location || 'No location specified'}</p> */}
                </div>

                {/* Error Message */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Tabbed Navigation */}
                <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
                            onClick={() => setActiveTab('details')}
                            style={{ color: '#000' }}
                        >
                            User Details
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'listed' ? 'active' : ''}`}
                            onClick={() => setActiveTab('listed')}
                            style={{ color: '#000' }}
                        >
                            Listed Houses
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'bookmarks' ? 'active' : ''}`}
                            onClick={() => setActiveTab('bookmarks')}
                            style={{ color: '#000' }}
                        >
                            Bookmarks
                        </button>
                    </li>
                </ul>

                {/* User Details Section */}
                {activeTab === 'details' && (
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4 className="card-title" style={{ color: '#203856' }}>User Details</h4>
                            <div className="row">
                                <div className="col-md-6">
                                    <p><strong>Username:</strong> {user?.username}</p>
                                    <p><strong>Email:</strong> {user?.email}</p>
                                    <p><strong>Contact:</strong> {user?.contact || 'Not provided'}</p>
                                </div>
                                <div className="col-md-6">
                                    <p><strong>Location:</strong> {user?.location || 'Not specified'}</p>
                                    <p><strong>Member Since:</strong> {new Date(user?.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Listed Houses Section */}
                {activeTab === 'listed' && (
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4 className="card-title" style={{ color: '#203856' }}>Listed Houses</h4>
                            <div className="row">
                                {loading ? (
                                    <div className="text-center">Loading listings...</div>
                                ) : listedHouses.length > 0 ? (
                                    listedHouses.map((listing) => (
                                        <div className="col-xl-4 mb-4" key={listing.id}>
                                            <div className="card shadow-sm">
                                                <img
                                                    src={listing.image_urls || defaultProfilePic}
                                                    alt={listing.title}
                                                    className="card-img-top"
                                                    style={{ height: '200px', objectFit: 'cover' }}
                                                />

                                                {/* ----Delete Button---- */}
                                                <button
                                                    onClick={() => handleDeleteProperty(listing.id)}
                                                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                                                    style={{zIndex: 1}}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <div className="card-body">
                                                    <h5 className="card-title">{listing.title}</h5>
                                                    <p className="card-text">{listing.location}</p>
                                                    <p className="card-text">Ksh {listing.price}/month</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No houses listed yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Bookmarks Section */}
                {activeTab === 'bookmarks' && (
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4 className="card-title" style={{ color: '#203856' }}>Bookmarks</h4>
                            <div className="row">
                                {loading ? (
                                    <div className="text-center">Loading bookmarks...</div>
                                ) : bookmarkedItems.length > 0 ? (
                                    bookmarkedItems.map((property) => (
                                        <div className="col-xl-4 mb-4" key={property.id}>
                                            <div className="card shadow-sm">
                                                <img
                                                    src={property.image_urls || defaultProfilePic}
                                                    alt={property.title}
                                                    className="card-img-top"
                                                    style={{ height: '200px', objectFit: 'cover' }}
                                                />
                                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                    <BookmarkButton
                                                        isBookmarked={true}
                                                        onClick={() => toggleBookmark(property.id)}
                                                    />
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="card-title">{property.title}</h5>
                                                    <p className="card-text">{property.location}</p>
                                                    <p className="card-text">Ksh {property.price}/month</p>
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
