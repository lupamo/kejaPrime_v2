import React from 'react';
import { Link } from 'react-router-dom';
import './Newlistings.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import exterior_1 from '../assets/images/exterior_1.jpg';
import exterior_2 from '../assets/images/exterior_2.jpg';
import exterior_3 from '../assets/images/exterior_3.jpg';
import exterior_4 from '../assets/images/exterior_4.jpg';
import location_icon from '../assets/images/location_icon.png';


const Newlistings = () => {
	//dummy data
	const listings = [
		{
		  id: 1,
		  image: exterior_1,
		  name: "Modern Villa",
		  location: "Kasarani, Nairobi",
		  price: "Ksh 20,000",
		},
		{
		  id: 2,
		  image: exterior_2,
		  name: "Beach House",
		  location: "Westlands, Nairobi",
		  price: "Ksh 35,000",
		},
		{
		  id: 3,
		  image: exterior_3,
		  name: "Country Cottage",
		  location: "Kilimani, Nairobi Kilimani, Nairobi",
		  price: "Ksh 50,000",
		},
		{
		  id: 4,
		  image: exterior_4,
		  name: "City Apartment",
		  location: "Kilimani, Nairobi",
		  price: "Ksh 25,000",
		},
	  ];

	return (
		<>
			<div
				className="d-flex justify-content-center top-10px"
				style={{ backgroundColor: "#f8f9fa", margin: "10px" }}
			>
				<div className="section p-4" style={{ width: "100%", height: "auto", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff" }}>
					<div className='listings d-flex justify-content-between align-items-center px-4'>
						<h2 className="head-3">Newest Listing</h2>
						<button className="btn">
							<Link className="link" to="/Listings">View All</Link>
						</button>
					</div>
					<div className="container mt-4">
						<div className="row">
						{listings.map((listing) => (
							<div className="carding col-xl-3" key={listing.id}>
								<div className="listing-card shadow-sm">
									<img
										src={listing.image}
										alt={listing.name}
										className="card-img-top"
									/>
									<div className="card-body" style={{padding: "12px"}}>
										<h4 style={{marginBottom: "10px", color:"#203856"}}>{listing.name}</h4>
										<p className="d-flex align-items-center">
											<img
											 src={location_icon}
											 alt="Location Icon"
											 style={{width: "16px", height: "16px"}}
											 className="me-2"
											/>
											{listing.location}
										</p>
										<h5 style={{color:"#203856"}}>{listing.price}</h5>
									</div>
								</div>
							</div>
						))}
						</div>
					</div>
				</div>
			</div>
			
			

		</>
	);
}
export default Newlistings;