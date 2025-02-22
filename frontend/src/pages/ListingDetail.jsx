import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import PropertyComments from '../components/PropertyComments';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';
import location_icon from '../assets/images/location_icon.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ListingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [listing, setListing] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch listing details from backend
    useEffect(() => {
        const fetchListing = async () => {
            try {
                console.log(`Fetching listing with ID: ${id}`);
                const response = await axios.get(`https://kejaprime-v2.onrender.com/${id}`);
                console.log('Full response:', response);
                setListing(response.data);
            } catch (error) {
                console.error('Axios error:', error);
                console.error('Network error details:', error.toJSON());
                setError('Failed to connect to server');
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [id]);

    if (loading) return <div className="text-center mt-4">Loading listing details...</div>;
    if (error) return <div className="alert alert-danger mt-4">{error}</div>;
    if (!listing) return <div className="text-center mt-4">Listing not found</div>;

    return (
        <>
            <Navbar />
            <div className="m-2 d-flex justify-content-between" style={{ alignItems: "center" }}>
                <div>
                    <h3>{listing.title}</h3>
                    <p>
                        <img
                            src={location_icon}
                            alt="Location Icon"
                            style={{ width: "16px", height: "16px" }}
                            className="me-2"
                        />
                        {listing.location}
                    </p>
                </div>
                <div>
                    <button
                        className="btn btn-secondary mb-3"
                        onClick={() => navigate("/listings")}
                    >
                        Back to Listings
                    </button>
                </div>
            </div>

            <div className="d-flex flex-column align-items-center">
                {/* Main image swiper */}
                <div style={{ width: "100%", maxWidth: "85%", marginBottom: "20px" }}>
                    <Swiper
                        spaceBetween={10}
                        navigation
                        pagination={{ clickable: true }}
                        modules={[Navigation, Pagination]}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Update active index on slide change
                        initialSlide={activeIndex} // Set initial slide to activeIndex
                    >
                        {listing.image_urls?.map((image, index) => (
                            <SwiperSlide key={index}>
                            
                                    <div className="card" style={{ width: "100%", height: "500px", border: "none" }}>
                                        <img
                                            src={image}
                                            alt={`Main Image ${index}`}
                                            className="card-img-top h-100"
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>

                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Thumbnail images in a Swiper carousel */}
                {listing.image_urls && listing.image_urls.length > 0 && (
                    <div style={{ width: "100%", maxWidth: "85%", margin: "0 auto", display: "none" }}>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={4}
                            navigation
                            pagination={{ clickable: true }}
                            modules={[Navigation, Pagination]}
                            allowTouchMove={false} // Disable swiping
                            preventClicks={false} // Allow clicks to propagate
                            breakpoints={{
                                320: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                        >
                            {listing.image_urls?.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div className="back" style={{ width: "100%", height: "150px", border: "1px solid red" }}>
                                        <div className="card"
                                            style={{
                                                width: "70%",
                                                height: "auto",
                                                cursor: "pointer",
                                                border: activeIndex === index ? "3px solid #007bff" : "none", // Highlight active thumbnail
                                            }}
                                            onClick={() => setActiveIndex(index)} // Set active index on thumbnail click
                                        >
                                            <img
                                                src={image}
                                                alt={`Thumbnail ${index}`}
                                                className="card-img-top h-100"
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                    </div>
                                    
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>

            <div className="descriptions" style={{ marginTop: "20px" }}>
                <div style={{ flex: "2", minWidth: "300px", padding: "10px" }}>
                    <h3 style={{ color: "#203856" }}>Description</h3>
                    <p style={{ background: "#f0f3f3", padding: "20px", borderRadius: "5px" }}>
                        {listing.description}
                    </p>
                </div>
            </div>
            {/* Comments Section */}
            <div className="container mt-4">
                <PropertyComments propertyId={id} />
            </div>
        </>
    );
};

export default ListingDetail;