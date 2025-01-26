import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import exterior_1 from '../assets/images/exterior_1.jpg';
import exterior_2 from '../assets/images/exterior_2.jpg';
import exterior_3 from '../assets/images/exterior_3.jpg';
import exterior_4 from '../assets/images/exterior_4.jpg';
import location_icon from '../assets/images/location_icon.png';

//dummy data
const listings = [
	{
		id: 2,
		image: exterior_2,
		number_rooms: "Single Room",
		name: "Beach House",
		location: "Westlands, Nairobi",
		price: "Ksh 35,000",
	},
	{
		id: 3,
		image: exterior_3,
		number_rooms: "Double Room",
		name: "Country Cottage",
		location: "Kilimani, Nairobi Kilimani, Nairobi",
		price: "Ksh 50,000",
	},
	{
		id: 4,
		image: exterior_4,
		number_rooms: "Bedsitter",
		name: "City Apartment",
		location: "Kilimani, Nairobi",
		price: "Ksh 25,000",
	},
	{
		id: 5,
		image: exterior_4,
		number_rooms: "Double Room",
		name: "City Apartment",
		location: "Kilimani, Nairobi",
		price: "Ksh 25,000",
		},
		{
		id: 6,
		image: exterior_4,
		number_rooms: "Double",
		name: "City Apartment",
		location: "Kilimani, Nairobi",
		price: "Ksh 25,000",
		},
		{
		id: 7,
		image: exterior_4,
		number_rooms: "1 Bedroom",
		name: "City Apartment",
		location: "Kilimani, Nairobi",
		price: "Ksh 25,000",
		},
		{
		id: 8,
		image: exterior_4,
		number_rooms: "Double Room",
		name: "City Apartment",
		location: "Kilimani, Nairobi",
		price: "Ksh 25,000",
		},
		{
		id: 9,
		image: exterior_4,
		number_rooms: "Double Room",
		name: "City Apartment",
		location: "Kilimani, Nairobi",
		price: "Ksh 25,000",
		},
		{
		id: 10,
		image: exterior_4,
		number_rooms: "3 Bedroom",
		name: "City Apartment",
		location: "Kilimani, Nairobi",
		price: "Ksh 25,000",
		},
		{
		id: 11,
		image: exterior_4,
		number_rooms: "Single Room",
		name: "City Apartment",
		location: "Kilimani, Nairobi",
		price: "Ksh 25,000",
		},
	];

const ListingDetail = () => {
	const {id} = useParams();
	const navigate = useNavigate();

	const listing = listings.find((listing) => listing.id === parseInt(id));

	if (!listing) {
		return (
			<div>
				<h1>Listing not found</h1>
				<button onClick={() => navigate('/listings')}>Go back to listings</button>
			</div>
		);
	}

	return (
		<>
			<Navbar />
			<div className="m-2 d-flex justify-content-between">
				<div>
					<h3>{listing.name}</h3>
					<p>
						<img
							src={location_icon}
							alt="Location Icon"
							style={{width: "16px", height: "16px"}}
							className="me-2"
						/>
						{listing.location}
					</p>
				</div>
				<button className="btn btn-secondary mb-3" style={{padding: "0 10px"}} onClick={() => navigate("/listings")}>Back to Listings</button>
			</div>
			
			<div className="card" style={{width:"200px", height:"300px", border:"1px solid red"}}>
		  		<img src={listing.image} alt={listing.name} className="card-img-top" />
		  	</div>
			<div className="card-body">
				<h3>{listing.name}</h3>
				<p>{listing.description}</p>
				<p><strong>Location:</strong> {listing.location}</p>
				<p><strong>Price:</strong> {listing.price}</p>
				<p><strong>Room Type:</strong> {listing.number_rooms}</p>
				{/* Add more fields such as user profile and name */}
		  </div>
		
		</>
		
	);
};


export default ListingDetail;