import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import Newlistings from '../components/Newlistings';
import HeroSection from '../components/HeroSection';
import Value from '../components/Value';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';

const Home = () => {
    const { token } = useContext(AuthContext);
    const [listings, setListings] = useState([]);
    const [filteredListings, setFilteredListings] = useState([]);

    // Fetch all listings on page load
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/properties/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.status === 200) {
                    setListings(response.data);
                    setFilteredListings(response.data); // Initially, show all listings
                }
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };
        fetchListings();
    }, [token]);

    // Handle search function
    const handleSearch = (searchCriteria) => {
        const { location, bedrooms } = searchCriteria;

        // Filter listings based on search criteria
        const results = listings.filter(listing =>
            listing.location.toLowerCase().includes(location.toLowerCase()) &&
            (bedrooms ? listing.bedrooms === parseInt(bedrooms) : true)
        );

        setFilteredListings(results);
    };

    return (
        <>  
            <Navbar />
            <HeroSection onSearch={handleSearch} />
            <Newlistings listings={filteredListings} />
            <Value />
            <Testimonials />
            <Footer />
        </>
    );
}

export default Home;
