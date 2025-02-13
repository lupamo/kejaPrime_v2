import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../utils/AuthContext";
import BookmarkButton from "../components/BookmarkButton";
import location_icon from "../assets/images/location_icon.png";

const Newistings = () => {
    const navigate = useNavigate();
    const { token, isLoggedIn } = useContext(AuthContext);
    const [recentListings, setRecentListings] = useState([]);
    const [bookmarkedListings, setBookmarkedListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRecentListings = async () => {
            try {
                const response = await axios.get("http://localhost:8000/properties/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.status === 200) {
                    // Get the last 4 listings
                    const lastFourListings = response.data.slice(-4);
                    setRecentListings(lastFourListings);
                }
            } catch (error) {
                console.error("Error fetching recent listings:", error);
                setError("Failed to load recent listings");
            } finally {
                setLoading(false);
            }
        };
        fetchRecentListings();
    }, [token]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            if (!token) return;

            try {
                const response = await axios.get('http://localhost:8000/bookmarks/', {
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
                    'http://localhost:8000/bookmarks/',
                    config
                );
                const bookmark = bookmarksResponse.data.find(b => b.property_id === listingId);
                
                if (bookmark) {
                    await axios.delete(
                        `http://localhost:8000/bookmarks/delete/${bookmark.id}`,
                        config
                    );
                    setBookmarkedListings(prev => prev.filter(id => id !== listingId));
                }
            } else {
                const response = await axios.post(
                    'http://localhost:8000/bookmarks/add',
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

    if (loading) {
        return <div className="text-center mt-4">Loading recent listings...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mt-4">{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h4 className="mb-4" style={{ color: "#203856" }}>Recent Listings</h4>
            <div className="row">
                {recentListings.length > 0 ? (
                    recentListings.map((listing) => (
                        <div className="carding col-xl-3" key={listing.id} style={{ marginBottom: "10px" }}>
                            <div className="listing-card shadow-sm">
                                <img
                                    src={listing.image_urls || "https://via.placeholder.com/300"}
                                    alt={listing.title}
                                    className="card-img-top"
                                    style={{ position: "relative", height: "200px", objectFit: "cover" }}
                                />
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <BookmarkButton
                                        isBookmarked={bookmarkedListings.includes(listing.id)}
                                        onClick={() => toggleBookmark(listing.id)}
                                    />
                                </div>
                                <div
                                    className="card-body"
                                    onClick={() => navigate(`/listings/${listing.id}`)}
                                    style={{ padding: "12px" }}
                                >
                                    <h4 style={{ marginBottom: "10px", color: "#203856" }}>
                                        {listing.title}
                                    </h4>
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
                    ))
                ) : (
                    <p>No recent listings found.</p>
                )}
            </div>
        </div>
    );
};

export default Newistings;