import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BookmarkButton from '../components/BookmarkButton';
import location_icon from '../assets/images/location_icon.png';
import './Newlistings.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Newlistings = ({ listings }) => {
    const navigate = useNavigate();

    if (!listings.length) {
        return <div className="text-center mt-4">No listings found</div>;
    }

    return (
        <div className="d-flex justify-content-center top-10px" style={{ backgroundColor: "#f8f9fa", margin: "10px" }}>
            <div className="section p-4" style={{ width: "100%", height: "auto", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" }}>
                <div className='listings d-flex justify-content-between align-items-center px-4'>
                    <h2 className="head-3">Newest Listings</h2>
                    <button className="btn">
                        <Link className="link" to="/Listings">View All</Link>
                    </button>
                </div>
                <div className="container mt-4">
                    <div className="row">
                        {listings.map((listing) => (
                            <div className="carding col-xl-3" key={listing.id}>
                                <div className="listing-card shadow-sm">
                                    <div>
                                        <img
                                            src={listing.images?.[0] || 'default-image.jpg'}
                                            alt={listing.title}
                                            className="card-img-top"
                                            style={{ position: 'relative' }}
                                        />
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: "10px" }}>
                                            <BookmarkButton
                                                isBookmarked={false}
                                                onClick={() => {}}
                                                style={{ zIndex: "1000" }}
                                            />
                                        </div>
                                    </div>
                                    <div className="card-body" onClick={() => navigate(`/listings/${listing.id}`)} style={{ padding: "5px" }}>
                                        <h4 style={{ marginBottom: "10px", color: "#203856" }}>{listing.title}</h4>
                                        <p className="d-flex align-items-center">
                                            <img
                                                src={location_icon}
                                                alt="Location Icon"
                                                style={{ width: "16px", height: "16px" }}
                                                className="me-2"
                                            />
                                            {listing.location}
                                        </p>
                                        <h5 style={{ color: "#203856" }}>Ksh {listing.price}/month</h5>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newlistings;
