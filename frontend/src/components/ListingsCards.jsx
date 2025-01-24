import React, { useState }from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./listingsCards.css"
import exterior_1 from '../assets/images/exterior_1.jpg';
import exterior_2 from '../assets/images/exterior_2.jpg';
import exterior_3 from '../assets/images/exterior_3.jpg';
import exterior_4 from '../assets/images/exterior_4.jpg';
import location_icon from '../assets/images/location_icon.png';


const ListingsCards = () => {
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
			id: 4,
			image: exterior_4,
			number_rooms: "Double Room",
			name: "City Apartment",
			location: "Kilimani, Nairobi",
			price: "Ksh 25,000",
		  },
		  {
			id: 4,
			image: exterior_4,
			number_rooms: "Double",
			name: "City Apartment",
			location: "Kilimani, Nairobi",
			price: "Ksh 25,000",
		  },
		  {
			id: 4,
			image: exterior_4,
			number_rooms: "1 Bedroom",
			name: "City Apartment",
			location: "Kilimani, Nairobi",
			price: "Ksh 25,000",
		  },
		  {
			id: 4,
			image: exterior_4,
			number_rooms: "Double Room",
			name: "City Apartment",
			location: "Kilimani, Nairobi",
			price: "Ksh 25,000",
		  },
		  {
			id: 4,
			image: exterior_4,
			number_rooms: "Double Room",
			name: "City Apartment",
			location: "Kilimani, Nairobi",
			price: "Ksh 25,000",
		  },
		  {
			id: 4,
			image: exterior_4,
			number_rooms: "3 Bedroom",
			name: "City Apartment",
			location: "Kilimani, Nairobi",
			price: "Ksh 25,000",
		  },
		  {
			id: 4,
			image: exterior_4,
			number_rooms: "Single Room",
			name: "City Apartment",
			location: "Kilimani, Nairobi",
			price: "Ksh 25,000",
		  },
	  ];
	  const [filter, setFilter] = useState("all");

	  const filteredListings = filter === "all" 
		? listings 
		: listings.filter((listing) => String(listing.number_rooms) === String(filter));
	return(
		<>
			<div className="results">
				<h4 style={{color: "#203856"}}>Result for: {filter === "all" ? "All Listings" : filter}</h4>
				<div className="filter mb-4">
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
						<div className="carding col-xl-3" style={{marginBottom: "10px"}} key={listing.id}>
							<div className="listing-card shadow-sm">
							<img
								src={listing.image}
								alt={listing.name}
								className="card-img-top"
							/>
							<div className="card-body" style={{ padding: "12px" }}>
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
}

export default ListingsCards;
