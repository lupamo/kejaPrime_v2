import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BookmarkButton from '../components/BookmarkButton';
import { useNavigate } from 'react-router-dom';
import "./listingsCards.css";
import exterior_1 from '../assets/images/exterior_1.jpg';
import exterior_2 from '../assets/images/exterior_2.jpg';
import exterior_3 from '../assets/images/exterior_3.jpg';
import exterior_4 from '../assets/images/exterior_4.jpg';
import interior_2 from '../assets/images/interior_2.jpg';
import interior_3 from '../assets/images/interior_3.jpg';
import interior_4 from '../assets/images/interior_4.jpg';
import interior_1 from '../assets/images/interior_1.jpg';
import location_icon from '../assets/images/location_icon.png';

// Dummy data
export const listings = [
    {
        id: 155,
        image: [exterior_2, interior_1, interior_2, interior_3],
        number_rooms: "Single Room",
        name: "Beach House",
        location: "Westlands, Nairobi",
        price: "Ksh 105,000",
    },
    {
        id: 3,
        image: [exterior_1, interior_4, interior_2, interior_3],
        number_rooms: "Double Room",
        name: "Country Cottage",
        location: "Kilimani, Nairobi Kilimani, Nairobi",
        price: "Ksh 50,000",
    },
    {
        id: 4,
        image: [exterior_3, interior_1, interior_2, interior_3],
        number_rooms: "Bedsitter",
        name: "City Apartment",
        location: "Kilimani, Nairobi",
        price: "Ksh 25,000",
    },
    {
        id: 5,
        image: [exterior_4],
        number_rooms: "Double Room",
        name: "City Apartment",
        location: "Kilimani, Nairobi",
        price: "Ksh 25,000",
    },
    {
        id: 6,
        image: [exterior_2, interior_1, interior_2, interior_3],
        number_rooms: "Double",
        name: "City Apartment",
        location: "Kilimani, Nairobi",
        price: "Ksh 25,000",
    },
    {
        id: 7,
        image: [exterior_2, interior_1, interior_2, interior_3],
        number_rooms: "1 Bedroom",
        name: "City Apartment",
        location: "Kilimani, Nairobi",
        price: "Ksh 25,000",
    },
    {
        id: 8,
        image: [exterior_2, interior_1, interior_2, interior_3],
        number_rooms: "Double Room",
        name: "City Apartment",
        location: "Kilimani, Nairobi",
        price: "Ksh 25,000",
    },
    {
        id: 9,
        image: [exterior_2, interior_1, interior_2, interior_3],
        number_rooms: "Double Room",
        name: "City Apartment",
        location: "Kilimani, Nairobi",
        price: "Ksh 25,000",
    },
    {
        id: 10,
        image: [exterior_2, interior_1, interior_2, interior_3],
        number_rooms: "3 Bedroom",
        name: "City Apartment",
        location: "Kilimani, Nairobi",
        price: "Ksh 25,000",
    },
    {
        id: 11,
        image: [exterior_2, interior_1, interior_2, interior_3],
        number_rooms: "Single Room",
        name: "City Apartment",
        location: "Kilimani, Nairobi",
        price: "Ksh 25,000",
    }
];

const ListingsCards = () => {
    const navigate = useNavigate();
    const [bookmarkedListings, setBookmarkedListings] = useState([]);

    const [filter, setFilter] = useState("all");

    const filteredListings = filter === "all"
        ? listings
        : listings.filter((listing) => String(listing.number_rooms) === String(filter));

    const handleCardClick = (id) => {
        navigate(`/listings/${id}`);
    };

    const toggleBookmark = (listingId) => {
		if (bookmarkedListings.includes(listingId)) {
			setBookmarkedListings(bookmarkedListings.filter((id) => id !== listingId));
		} else {
			setBookmarkedListings([...bookmarkedListings, listingId]);
		}
	};

    return (
        <>
            <div className="results">
                <h4 style={{ color: "#203856" }}>Result for: {filter === "all" ? "All Listings" : filter}</h4>
                <div className="filter mb-4" style={{ zIndex: "1000" }}>
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
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => setFilter("all")}
                                >
                                    All
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => setFilter("Single Room")}
                                >
                                    Single Room
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => setFilter("Double Room")}
                                >
                                    Double Room
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => setFilter("Bedsitter")}
                                >
                                    Bedsitter
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => setFilter("1 Bedroom")}
                                >
                                    1 Bedroom
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => setFilter("2 Bedroom")}
                                >
                                    2 Bedroom
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown-item"
                                    onClick={() => setFilter("3 Bedroom")}
                                >
                                    3 Bedroom
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container mt-4">
                <div className="row">
                    {filteredListings.length > 0 ? (
                        filteredListings.map((listing) => (
                            <div className="carding col-xl-3" key={listing.id} style={{ marginBottom: "10px" }}>
                                <div className="listing-card shadow-sm">
                                    <img
                                        src={listing.image[0]} 
                                        alt={listing.name}
                                        className="card-img-top"
                                        style={{position: 'relative'}}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <BookmarkButton
                                                isBookmarked={bookmarkedListings.includes(listing.id)}
                                                onClick={() => toggleBookmark(listing.id)}
                                            />
                                    </div>
                                    <div className="card-body" onClick={() => handleCardClick(listing.id)} style={{ padding: "12px" }}>
                                        <h4 style={{ marginBottom: "10px", color: "#203856" }}>
                                            {listing.name}
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
                                        <h5 style={{ color: "#203856" }}>{listing.price}</h5>
                                        
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