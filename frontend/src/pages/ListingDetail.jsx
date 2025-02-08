import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
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
    const [mainImage, setMainImage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch listing details from backend
    useEffect(() => {
        const fetchListing = async () => {
            try {
                // console.log('Token being sent:', token);
                const response = await axios.get(`http://localhost:8000/properties/${id}`, {
                    // headers: { Authorization: `Bearer ${token}` }
                });
                if (response.status === 200) {
                    setListing(response.data);
                    setMainImage(response.data.images?.[0] || '');
                }
            } catch (error) {
                console.error('Error details:', {
                    status: error.response?.status,
                    data: error.response?.data,
                    headers: error.response?.headers
                });
                setError(error.response?.data?.detail || 'Failed to load listing details');
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [id, token]);

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
                {/* Main image */}
                <div className="card mb-3" style={{ width: "100%", maxWidth: "85%", height: "auto" }}>
                    <img
                        src={mainImage || 'default-image.jpg'}
                        alt={listing.title}
                        className="card-img-top"
                        style={{ width: "100%", height: "500px", objectFit: "cover" }}
                    />
                </div>

                {/* Thumbnail images in a Swiper carousel */}
                {listing.images && listing.images.length > 0 && (
                    <div style={{ width: "100%", maxWidth: "85%", margin: "0 auto" }}>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={4}
                            navigation
                            pagination={{ clickable: true }}
                            modules={[Navigation, Pagination]}
                            breakpoints={{
                                320: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                        >
                            {listing.images.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <div
                                        className="card"
                                        style={{ width: "80%", height: "150px", cursor: "pointer" }}
                                        onClick={() => setMainImage(image)}
                                    >
                                        <img
                                            src={image}
                                            alt={`Thumbnail ${index}`}
                                            className="card-img-top h-100"
                                            style={{ objectFit: "cover" }}
                                        />
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
        </>
    );
};

export default ListingDetail;