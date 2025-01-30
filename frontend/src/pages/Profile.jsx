import React from 'react';
import { listings } from '../components/ListingsCards'; // Import the listings array

const Profile = () => {
    // Retrieve bookmarked listings from localStorage
    const bookmarkedListings = JSON.parse(localStorage.getItem('bookmarkedListings')) || [];

    // Filter listings to only include bookmarked ones
    const bookmarkedItems = listings.filter(listing => bookmarkedListings.includes(listing.id));

    return (
        <div className="container mt-4">
            <h2>My Bookmarks</h2>
            <div className="row">
                {bookmarkedItems.length > 0 ? (
                    bookmarkedItems.map((listing) => (
                        <div className="carding col-xl-3" key={listing.id}>
                            <div className="listing-card shadow-sm">
                                <img
                                    src={listing.image[0]}
                                    alt={listing.name}
                                    className="card-img-top"
                                />
                                <div className="card-body" style={{ padding: "12px" }}>
                                    <h4 style={{ marginBottom: "10px", color: "#203856" }}>{listing.name}</h4>
                                    <p className="d-flex align-items-center">
                                        <img
                                            src={location_icon}
                                            alt="Location Icon"
                                            style={{ width: "16px", height: "16px" }}
                                            className="me-2"
                                        />
                                        {listing.location}
                                    </p>
                                    <h5 style={{ color: "#203856" }}>{listing.price}</h5>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No bookmarks found.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;