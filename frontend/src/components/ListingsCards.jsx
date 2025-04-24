
import React, { useState, useEffect, useContext } from "react";
import "@popperjs/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import BookmarkButton from "../components/BookmarkButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../utils/AuthContext";
import "./listingsCards.css";
import location_icon from "../assets/images/location_icon.png";

const ListingsCards = () => {
    const navigate = useNavigate();
    const { user, token, isLoggedIn } = useContext(AuthContext);
    const [listings, setListings] = useState([]);
    const [bookmarkedListings, setBookmarkedListings] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get("https://kejaprime-v2.onrender.com/properties/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.status === 200) {
                    setListings(response.data);
                }
            } catch (error) {
                console.error("Error fetching listings:", error);
                setError("Failed to load listings");
            } finally {
                setLoading(false);
            }
        };
        fetchListings();
    }, [token]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            if (!token) return;

            try {
                const response = await axios.get('https://kejaprime-v2.onrender.com/bookmarks/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.status === 200) {
                    const bookmarkedIds = response.data.map(bookmark => bookmark.property_id);
                    setBookmarkedListings(bookmarkedIds);
                }
            } catch (error) {
                console.error("Error fetching bookmarks:", error);
            }
        };

        fetchBookmarks();
    }, [token]);

    const toggleBookmark = async (listingId) => {
        if (!isLoggedIn || !token) {
            console.error("User not logged in");
            setError("Please login to bookmark listings");
            return;
        }

        try {
            const config = {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            if (bookmarkedListings.includes(listingId)) {
                const bookmarksResponse = await axios.get(
                    'https://kejaprime-v2.onrender.com/bookmarks/',
                    config
                );
                const bookmark = bookmarksResponse.data.find(b => b.property_id === listingId);
                
                if (bookmark) {
                    await axios.delete(
                        `https://kejaprime-v2.onrender.com/bookmarks/delete/${bookmark.id}`,
                        config
                    );
                    setBookmarkedListings(prev => prev.filter(id => id !== listingId));
                }
            } else {
                const response = await axios.post(
                    'https://kejaprime-v2.onrender.com/bookmarks/add',
                    {},
                    {
                        ...config,
                        params: { property_id: listingId }
                    }
                );
                if (response.status === 200 || response.status === 201) {
                    setBookmarkedListings(prev => [...prev, listingId]);
                }
            }
        } catch (error) {
            console.error("Bookmark error:", error);
            setError(error.response?.data?.detail || "Failed to bookmark property");
        }
    };

    const filteredListings =
        filter === "all" ? listings : listings.filter((listing) => listing.property_type === filter);

    if (loading) {
        return <div className="text-center mt-4">Loading listings...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mt-4">{error}</div>;
    }

    return (
        <>
            <div className="results">
                <h4 style={{ color: "#203856" }}>
                    Result for: {filter === "all" ? "All Listings" : filter}
                </h4>
                <div className="filter mb-4" style={{ zIndex: "10000" }}>
                    <div className="dropdown">
                        <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            id="filterDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Filter
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                            {["all", "Single Room", "Double Room", "Bedsitter", "1 Bedroom", "2 Bedroom", "3 Bedroom"].map((type) => (
                                <li key={type}>
                                    <button className="dropdown-item" onClick={() => setFilter(type)}>
                                        {type}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row">
                    {filteredListings.length > 0 ? (
                        filteredListings.map((listing) => (
                            <div className="carding col-xl-4 " key={listing.id} style={{ marginBottom: "10px" }}>
                                <div className="listing-card shadow-lg rounded-3 position-relative">
                                    <img
                                        src={listing.image_urls || "https://via.placeholder.com/300"}
                                        alt={listing.title}
                                        className="card-img-top p-2"
                                        style={{ position: "relative", borderRadius: "1rem", height: "250px", objectFit: "cover" }}
                                    />
                                    <div className="position-absolute" style={{ top: "15px", right: "15px" }}>
                                        <BookmarkButton
                                            isBookmarked={bookmarkedListings.includes(listing.id)}
                                            onClick={() => toggleBookmark(listing.id)}
                                        />
                                    </div>
                                    <div
                                        className="card-body"
                                        style={{ padding: "10px"}}
                                    >
                                        <h4 style={{ marginBottom: "5px", color: "#203856" }}>
                                            {listing.title}
                                        </h4>
                                        <h5 style={{ fontWeight:"620", color: "#203856" }}>
                                            {listing.name}
                                        </h5>
                                        <p className="d-flex align-items-center" style={{ fontWeight:"450"}}>
                                            <img
                                                src={location_icon}
                                                alt="Location Icon"
                                                style={{ width: "16px", height: "16px"}}
                                                className="me-2"
                                            />
                                            {listing.location}
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h5 style={{ color: "#203856"}}>Ksh {listing.price}/month</h5>
                                            <button className="detail-button" style={{width: "100px", height:"38px", borderRadius: "5px", display:"flex", justifyContent:"center", alignItems:"center", border: "1px solid #fd8a20", color:"#272724", fontSize: "15px", fontWeight:"450", cursor: "pointer" }} onClick={() => navigate(`/listings/${listing.id}`)}>
                                                   View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No listings found for this filter.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ListingsCards;