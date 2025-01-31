import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from '../components/Navbar';
import Map from '../components/Map';
import ListingsCards from '../components/ListingsCards';

const Listings = () => {
	return (
		<>
			<Navbar />
			<h3 style={{color:"#203856", margin:"10px 20px"}}>Listings</h3>
			<Map />
			<ListingsCards />
		</>
	);
}

export default Listings;