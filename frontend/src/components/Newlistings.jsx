import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './Newlistings.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { listings } from './ListingsCards';
import BookmarkButton from '../components/BookmarkButton';
import location_icon from '../assets/images/location_icon.png';


const Newlistings = () => {
	const navigate = useNavigate();
	const firstFourListings = listings.slice(0, 4);
	
	const handleCardClick = (id) => {
        navigate(`/listings/${id}`);
    };
	const [bookmarkedListings, setBookmarkedListings] = useState([]);

	const toggleBookmark = (listingId) => {
		if (bookmarkedListings.includes(listingId)) {
			setBookmarkedListings(bookmarkedListings.filter((id) => id !== listingId));
		} else {
			setBookmarkedListings([...bookmarkedListings, listingId]);
		}
	};


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
						{firstFourListings.map((listing) => (
							<div className="carding col-xl-3" key={listing.id}>
								<div className="listing-card shadow-sm">
									<div>
										<img
											src={listing.image.length > 0 ? listing.image[0] : fallbackImage}
											alt={listing.name}
											className="card-img-top"
											style={{position: 'relative'}}
											
										/>
										<div style={{ display: 'flex', justifyContent: 'flex-end', marginRight:"10px"}}>
                                            <BookmarkButton
                                                isBookmarked={bookmarkedListings.includes(listing.id)}
                                                onClick={() => toggleBookmark(listing.id)}
												style={{zIndex: "1000"}}
                                            />
                                    	</div>
									</div>
									
									<div className="card-body" onClick={() => handleCardClick(listing.id)} style={{padding: "5px"}}>
										
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